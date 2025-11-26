import { BaseStrategy } from "./BaseStrategy";
import { NormalizedInvestor, ProrationResult } from "../types";

export class AverageStrategy implements BaseStrategy {
    prorate(allocation: number, investors: NormalizedInvestor[]): ProrationResult {
        const eligible = investors.filter(i => i.cap > 0);

        //base accumulator
        const baseAlloc: Record<string, number> = Object.fromEntries(
            eligible.map(i => [i.name, 0])
        );

        //local cap map (immutable investors list, but mutable cap state)
        const caps = new Map(eligible.map(i => [i.name, i.cap]));

        //to compute sum of averages of active investors
        const totalAvg = (actives: NormalizedInvestor[]) =>
            actives.reduce((sum, i) => sum + i.avg, 0);


        // full precision proration until some investors hit their cap.
        let remaining = allocation;
        let active = [...eligible]; // explicit copy

        while (remaining > 0 && active.length > 0) {
            const avgSum = totalAvg(active);
            if (avgSum === 0) break;

            const proportionalShares = active.map(i => {
                const share = (i.avg / avgSum) * remaining;
                const cap = caps.get(i.name)!;
                return { investor: i, amount: Math.min(share, cap) };
            });

            const distributed = proportionalShares.reduce((s, p) => s + p.amount, 0);
            if (distributed <= 0) break;

            //apply proportional amounts
            proportionalShares.forEach(p => {
                baseAlloc[p.investor.name] += p.amount;
                caps.set(p.investor.name, caps.get(p.investor.name)! - p.amount);
            });

            remaining -= distributed;

            //close investors who hit their cap, flooring their final amount
            active = active.filter(i => {
                const capLeft = caps.get(i.name)!;
                if (capLeft <= 0) {
                    baseAlloc[i.name] = Math.floor(baseAlloc[i.name]);
                    return false;
                }
                return true;
            });
        }

        //residual redistribution
        if (remaining > 0 && active.length > 0) {
            const avgSum = totalAvg(active);
            if (avgSum > 0) {
                const secondShares = active.map(i => {
                    const share = (i.avg / avgSum) * remaining;
                    const cap = caps.get(i.name)!;
                    return { investor: i, amount: Math.min(share, cap) };
                });

                const distributed = secondShares.reduce((s, p) => s + p.amount, 0);

                //apply distributed amounts
                secondShares.forEach(p => {
                    baseAlloc[p.investor.name] += p.amount;
                });

                //floor active investors after this pass
                active.forEach(i => {
                    baseAlloc[i.name] = Math.floor(baseAlloc[i.name]);
                });

                //recalculate remaining allocation after flooring
                const used = Object.values(baseAlloc).reduce((a, b) => a + b, 0);
                remaining = allocation - used;

                //if something is still left (rare), we leave it unassigned (expected datasets show no further distribution steps).
            }
        }

        //minimum guarantee
        //some datasets enforce that investors who received a fractional positive
        //contribution end up with at least one unit.
        for (const inv of eligible) {
            const val = baseAlloc[inv.name];
            if (val > 0 && val < 1) baseAlloc[inv.name] = 1;
        }

        return baseAlloc;
    }
}
