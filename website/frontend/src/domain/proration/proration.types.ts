export type InvestorInput = {
    name: string;
    requested_amount: number;
    average_amount: number;
};

export type ProrationInput = {
    allocation_amount: number;
    investor_amounts: InvestorInput[];
};

export type ProrationResult = {
    [name: string]: number;
};
