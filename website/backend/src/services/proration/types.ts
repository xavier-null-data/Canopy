export type InvestorInput = {
    name: string;
    requested_amount: number;
    average_amount: number;
};

export type NormalizedInvestor = {
    name: string;
    cap: number;
    avg: number;
};

export type ProrationResult = Record<string, number>;
