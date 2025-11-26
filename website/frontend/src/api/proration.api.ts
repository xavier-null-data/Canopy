import http from "./http";
import { ProrationInput, ProrationResult } from "@domain/proration/proration.types";

// API call wrapped in a function for cleanliness
export async function prorateAllocation(
    payload: ProrationInput
): Promise<ProrationResult> {
    const res = await http.post("/prorate", payload);
    return res.data;
}
