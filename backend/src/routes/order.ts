import { Router } from "express";
import { allowRoles } from "@middlewares/allowRoles";
import { ROLES } from "@enums/index";
import { OrderController } from "@controllers/order";

const router = Router();

router.use(allowRoles(ROLES.USER));

router.post("/:courseId/pay", OrderController.createOrder);
router.post("/verify", OrderController.verifyPayment);
router.post("/cancel", OrderController.cancelOrder);
router.get("/my", OrderController.myOrders);

export default router;
