import { Request, Response } from "express";
import { ProrationService } from "../services/proration/ProrationService";
import { AverageStrategy } from "../services/proration/strategies/AverageStrategy";

export const prorateController = (req: Request, res: Response) => {
    try {
        const { allocation_amount, investor_amounts } = req.body;

        const service = new ProrationService(new AverageStrategy());
        const result = service.run(allocation_amount, investor_amounts);

        return res.json(result);
    } catch (err: any) {
        console.error("Proration error:", err.message);
        return res.status(500).json({ error: err.message });
    }
};
