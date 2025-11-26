import React from "react";
import InvestorRow from "@components/InvestorRow/InvestorRow";
import { useAllocationForm } from "@hooks/useAllocationForm";
import { InvestorInput } from "@domain/proration/proration.types";

type Props = {
    onSubmit: (allocation: number, investors: InvestorInput[]) => void;
    onResetResults: () => void;
    loading: boolean;
};

const AllocationForm: React.FC<Props> = ({
                                             onSubmit,
                                             onResetResults,
                                             loading,
                                         }) => {
    const {
        allocation,
        setAllocation,
        investors,
        addInvestor,
        removeInvestor,
        updateInvestor,
        resetForm,
        submit,
    } = useAllocationForm(onSubmit, onResetResults);

    return (
        <div className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
            <div className="mb-4">
                <label className="block font-semibold mb-1">Allocation Amount</label>
                <input
                    type="number"
                    value={allocation}
                    onChange={(e) => setAllocation(e.target.value)}
                    className="w-full border p-2 rounded"
                    placeholder="Enter total allocation"
                />
            </div>

            <h3 className="font-semibold text-lg mb-3">Investors</h3>

            {investors.map((inv, idx) => (
                <div key={idx} className="flex items-start gap-3 mb-3">
                    <InvestorRow
                        index={idx}
                        investor={inv}
                        onChange={updateInvestor}
                    />

                    {investors.length > 1 && (
                        <button
                            onClick={() => removeInvestor(idx)}
                            className="text-red-500 font-bold mt-2"
                            title="Remove investor"
                        >
                            ✕
                        </button>
                    )}
                </div>
            ))}

            <div className="mt-4 flex gap-3">
                <button
                    onClick={addInvestor}
                    className="px-3 py-2 bg-blue-600 text-white rounded"
                >
                    + Add Investor
                </button>

                <button
                    onClick={resetForm}
                    className="px-3 py-2 bg-gray-300 text-gray-800 rounded"
                >
                    Reset Form
                </button>
            </div>

            <button
                onClick={submit}
                disabled={loading}
                className="mt-5 px-4 py-2 bg-green-600 text-white rounded w-full"
            >
                {loading ? "Calculating..." : "Run Proration"}
            </button>
        </div>
    );
};

export default AllocationForm;
