import { OrderService } from "@services/order";
import type { Request, Response } from "express";
import { Assert } from "@utils/assert";
import { asyncHandler } from "@middlewares/error";
import { StatusCodes } from "http-status-codes";
import type { IGenericResponse } from "@satheomkar24/common-types";

export class OrderController {
  static createOrder = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    Assert.required(userId, "User ID");

    const { courseId } = req.params;
    Assert.required(courseId, "Course ID");

    const response = await OrderService.createOrder(userId, courseId);
    res.json(response).status(StatusCodes.CREATED);
  });

  static verifyPayment = asyncHandler(async (req: Request, res: Response) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const response = await OrderService.verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    );
    res.json({ message: "Payment successful", data: response });
  });

  static cancelOrder = asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.body;
    Assert.required(orderId, "Order Id");
    await OrderService.cancelOrder(orderId);
    res.json({ message: "Order cancelled" });
  });

  static myOrders = asyncHandler(async (req: Request, res: Response) => {
    const orders = await OrderService.getMyOrders(req.user!.id);
    res.json(orders);
  });
}
