import { Router } from "express";
import { StudentAuthController } from "@controllers/studentAuth";

const router = Router();

router.post("/register", StudentAuthController.register);

router.post("/login", StudentAuthController.login);

router.post("/forgot-password", StudentAuthController.forgotPassword);

router.post("/reset-password", StudentAuthController.resetPassword);

export default router;
