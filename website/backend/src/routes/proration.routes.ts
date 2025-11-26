import { Router } from "express";
import { prorateController } from "../controllers/proration.controller";

const router = Router();
router.post("/prorate", prorateController);

export default router;
