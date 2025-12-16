import { Router } from "express";
import { StudentAuthController } from "@controllers/studentAuth";

const router = Router();

router.post("/register", StudentAuthController.register);

router.post("/login", StudentAuthController.login);

export default router;
