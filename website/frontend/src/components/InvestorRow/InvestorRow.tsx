import React from "react";

type RawInvestor = { name: string; requested: string; average: string };

type Props = {
    index: number;
    investor: RawInvestor;
    onChange: (index: number, field: keyof RawInvestor, value: string) => void;
};

const InvestorRow: React.FC<Props> = ({ index, investor, onChange }) => {
    return (
        <div className="grid grid-cols-3 gap-4 mb-3">
            <input
                type="text"
                placeholder="Name"
                value={investor.name}
                onChange={(e) => onChange(index, "name", e.target.value)}
                className="border p-2 rounded"
            />

            <input
                type="number"
                placeholder="Requested"
                value={investor.requested}
                onChange={(e) => onChange(index, "requested", e.target.value)}
                className="border p-2 rounded"
            />

            <input
                type="number"
                placeholder="Average"
                value={investor.average}
                onChange={(e) => onChange(index, "average", e.target.value)}
                className="border p-2 rounded"
            />
        </div>
    );
};

export default InvestorRow;
