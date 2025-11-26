import { useState } from "react";
import { parseInvestor } from "@domain/proration/proration.mappers";
import {
    validateInvestor,
    validateAllocation,
} from "@domain/proration/proration.validators";
import { InvestorInput } from "@domain/proration/proration.types";

type RawInvestor = { name: string; requested: string; average: string };

export function useAllocationForm(
    onSubmit: (a: number, i: InvestorInput[]) => void,
    onResetResults: () => void
) {
    const [allocation, setAllocation] = useState("");
    const [investors, setInvestors] = useState<RawInvestor[]>([
        { name: "", requested: "", average: "" },
    ]);

    const addInvestor = () => {
        setInvestors((prev) => [
            ...prev,
            { name: "", requested: "", average: "" },
        ]);
    };

    const removeInvestor = (index: number) => {
        setInvestors((prev) => prev.filter((_, i) => i !== index));
    };

    const updateInvestor = (
        index: number,
        field: keyof RawInvestor,
        value: string
    ) => {
        setInvestors((prev) =>
            prev.map((inv, idx) =>
                idx === index ? { ...inv, [field]: value } : inv
            )
        );
    };

    const resetForm = () => {
        setAllocation("");
        setInvestors([{ name: "", requested: "", average: "" }]);
        onResetResults();
    };

    const submit = () => {
        const allocErr = validateAllocation(Number(allocation));
        if (allocErr) {
            alert(allocErr);
            return;
        }

        const parsed = investors.map((i) =>
            parseInvestor(i.name, i.requested, i.average)
        );

        for (const inv of parsed) {
            const err = validateInvestor(inv);
            if (err) {
                alert(err);
                return;
            }
        }

        onSubmit(Number(allocation), parsed);
    };

    return {
        allocation,
        setAllocation,
        investors,
        addInvestor,
        removeInvestor,
        updateInvestor,
        resetForm,
        submit,
    };
}
