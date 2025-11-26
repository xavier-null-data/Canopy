import { useState } from "react";
import { prorateAllocation } from "@api/proration.api";
import {
    ProrationResult,
    ProrationInput,
} from "@domain/proration/proration.types";

export function useProration() {
    const [results, setResults] = useState<ProrationResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const resetResults = () => {
        setResults(null);
        setError(null);
    };

    const runProration = async (allocation: number, investors: any[]) => {
        setLoading(true);
        setError(null);
        setResults(null);

        const payload: ProrationInput = {
            allocation_amount: allocation,
            investor_amounts: investors,
        };

        try {
            const response = await prorateAllocation(payload);
            setResults(response);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        results,
        loading,
        error,
        runProration,
        resetResults,
    };
}
