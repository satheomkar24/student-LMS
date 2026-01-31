import { StudentController } from "@controllers/student";
import { ROLES } from "@enums/index";
import { allowRoles } from "@middlewares/allowRoles";
import { ownResourceOrAdmin } from "@middlewares/ownResourceOrAdmin";
import { Router } from "express";

const router = Router();

router.get("/", allowRoles(ROLES.ADMIN), StudentController.getAll);

router.use(allowRoles(ROLES.ADMIN, ROLES.USER), ownResourceOrAdmin);

router.get("/:id", StudentController.getById);
router.put("/:id", StudentController.update);
router.delete("/:id", StudentController.delete);

export default router;
