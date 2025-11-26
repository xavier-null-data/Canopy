import { InvestorInput } from "./proration.types";

// simple validation helpers for cleaner components

export function validateInvestor(i: InvestorInput): string | null {
    if (!i.name.trim()) return "Investor name is required";
    if (i.requested_amount < 0) return "Requested amount cannot be negative";
    if (i.average_amount < 0) return "Average amount cannot be negative";
    return null;
}

export function validateAllocation(amount: number): string | null {
    if (isNaN(amount) || amount <= 0)
        return "Allocation must be a positive number";
    return null;
}
