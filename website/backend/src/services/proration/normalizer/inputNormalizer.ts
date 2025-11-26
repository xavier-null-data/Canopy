import { InvestorInput, NormalizedInvestor } from "../types";

// converts raw input to a simpler internal structure
export const normalizeInput = (
    input: InvestorInput[]
): NormalizedInvestor[] => {
    return input.map((i) => ({
        name: i.name,
        cap: i.requested_amount,
        avg: i.average_amount,
    }));
};
