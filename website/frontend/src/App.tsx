import React from "react";
import AllocationForm from "@components/AllocationForm/AllocationForm";
import ResultsPanel from "@components/ResultsPanel/ResultsPanel";
import { useProration } from "@hooks/useProration";

const App: React.FC = () => {
    const { results, loading, error, runProration, resetResults } =
        useProration();

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
                Allocation Proration Tool
            </h1>

            <AllocationForm
                onSubmit={runProration}
                onResetResults={resetResults}
                loading={loading}
            />

            {error && (
                <div className="text-red-600 text-center mt-4">{error}</div>
            )}

            <ResultsPanel results={results} />
        </div>
    );
};

export default App;
