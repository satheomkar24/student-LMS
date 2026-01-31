import { Router } from "express";
import refreshRoutes from "@routes/refresh";
import studentAuthRoutes from "@routes/studentAuth";
import adminAuthRoutes from "@routes/adminAuth";
import instructorRoutes from "@routes/instructor";
import studentRoutes from "@routes/student";
import adminRoutes from "@routes/admin";
import courseRoutes from "@routes/course";
import orderRoutes from "@routes/order";
import { auth } from "@middlewares/auth";
import { allowRoles } from "@middlewares/allowRoles";
import { ROLES } from "./enums";

const router = Router();

router.use("/auth", refreshRoutes);
router.use("/auth/students", studentAuthRoutes);
router.use("/auth/admins", adminAuthRoutes);
router.use("/instructors", instructorRoutes);
router.use("/students", auth, studentRoutes);
router.use("/admins", auth, allowRoles(ROLES.ADMIN), adminRoutes);
router.use("/courses", courseRoutes);
router.use("/orders", auth, orderRoutes);

export default router;
