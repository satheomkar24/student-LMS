import { CourseController } from "@controllers/course";
import { ROLES } from "@enums/index";
import { allowRoles } from "@middlewares/allowRoles";
import { auth } from "@middlewares/auth";
import { optionalAuth } from "@middlewares/optionalAuth";
import { Router } from "express";

const router = Router();

router.get("/", CourseController.getAll);
router.get("/:id", optionalAuth, CourseController.getById);

router.use(auth, allowRoles(ROLES.ADMIN));

router.post("/", CourseController.create);
router.put("/:id", CourseController.update);
router.delete("/:id", CourseController.delete);

export default router;
