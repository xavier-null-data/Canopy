import { NormalizedInvestor, ProrationResult } from "../types";

// base contract for any proration strategy
export interface BaseStrategy {
    prorate(allocation: number, investors: NormalizedInvestor[]): ProrationResult;
}
