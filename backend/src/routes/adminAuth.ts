import { AdminAuthController } from "@controllers/adminAuth";
import { Router } from "express";

const router = Router();

router.post("/register", AdminAuthController.register);

router.post("/login", AdminAuthController.login);

router.post("/forgot-password", AdminAuthController.forgotPassword);

router.post("/reset-password", AdminAuthController.resetPassword);

export default router;
