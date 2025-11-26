import { InvestorInput } from "./proration.types";

// ensures numbers are parsed correctly before sending to backend
export function parseInvestor(
    name: string,
    requested: string,
    average: string
): InvestorInput {
    return {
        name,
        requested_amount: Number(requested),
        average_amount: Number(average),
    };
}
