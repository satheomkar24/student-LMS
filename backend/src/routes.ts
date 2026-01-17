import { Router } from "express";
import studentAuthRoutes from "@routes/studentAuth";
import adminAuthRoutes from "@routes/adminAuth";

const router = Router();

router.use("/auth/students", studentAuthRoutes);
router.use("/auth/admins", adminAuthRoutes);

export default router;
