import { InstructorController } from "@controllers/instructor";
import { ROLES } from "@enums/index";
import { allowRoles } from "@middlewares/allowRoles";
import { auth } from "@middlewares/auth";
import { Router } from "express";

const router = Router();

router.get("/", InstructorController.getAll);
router.get("/:id", InstructorController.getById);

router.use(auth, allowRoles(ROLES.ADMIN));

router.post("/", InstructorController.create);
router.put("/:id", InstructorController.update);
router.delete("/:id", InstructorController.delete);

export default router;
