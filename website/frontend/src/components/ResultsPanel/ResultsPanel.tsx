import React from "react";
import { ProrationResult } from "@domain/proration/proration.types";

type Props = {
    results: ProrationResult | null;
};

const ResultsPanel: React.FC<Props> = ({ results }) => {
    if (!results) return null;

    return (
        <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto mt-6">
            <h2 className="text-xl font-semibold mb-4">Proration Results</h2>

            <ul>
                {Object.entries(results).map(
                    ([name, amount]: [string, number]) => (
                        <li key={name} className="mb-2">
                            <span className="font-semibold">{name}</span> — $
                            {amount.toLocaleString()}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default ResultsPanel;
