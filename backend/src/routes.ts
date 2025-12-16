import { Router } from "express";
import studentAuthRoutes from "@routes/studentAuth";

const router = Router();

router.use("/auth/students", studentAuthRoutes);

export default router;
