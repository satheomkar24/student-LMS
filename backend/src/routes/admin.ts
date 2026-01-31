import { AdminController } from "@controllers/admin";
import { Router } from "express";

const router = Router();

router.get("/", AdminController.getAll);
router.get("/:id", AdminController.getById);
router.put("/:id", AdminController.update);
router.delete("/:id", AdminController.delete);

export default router;
