import { BaseStrategy } from "./strategies/BaseStrategy";
import { normalizeInput } from "./normalizer/inputNormalizer";
import { InvestorInput, ProrationResult } from "./types";

// orchestrates normalization and strategy execution
export class ProrationService {
    constructor(private strategy: BaseStrategy) {}
    run(allocation: number, input: InvestorInput[]): ProrationResult {
        const normalized = normalizeInput(input);
        return this.strategy.prorate(allocation, normalized);
    }
}
