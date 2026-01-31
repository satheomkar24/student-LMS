import { Assert } from "@utils/assert";
import { Course } from "@models/course";
import { Order } from "@models/order";
import { ORDER_STATUS } from "@enums/index";
import { ErrorRes } from "@middlewares/error";
import { StatusCodes } from "http-status-codes";
import Razorpay from "razorpay";
import crypto from "crypto";
import { env } from "@config/env";
import { toObjectId } from "@utils/objectId";

export class OrderService {
  static razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  static async createOrder(userId: string, courseId: string) {
    console.log(this.razorpay);
    console.log(process.env.RAZORPAY_KEY_ID);
    console.log(process.env.RAZORPAY_KEY_SECRET);
    const course = await Course.findById(courseId).lean();
    Assert.entityFound(course, "Course");
    console.log("📢[order.ts:23]: course: ", course);

    // Prevent duplicate purchase
    const exists = await Order.exists({
      user: userId,
      course: courseId,
      status: ORDER_STATUS.PAID,
    });
    console.log("📢[order.ts:28]: exists: ", exists);

    if (exists) {
      throw new ErrorRes("Course already purchased", StatusCodes.BAD_REQUEST);
    }

    const order = await this.razorpay.orders.create({
      amount: course.price * 100, // Razorpay expects paise
      currency: "INR",
      receipt: `order_${userId.slice(-6)}_${courseId.slice(-6)}`,
    });

    console.log("📢[order.ts:39]: order: ", order);

    await Order.create({
      user: toObjectId(userId),
      course: courseId,
      orderId: order.id,
      amount: course.price,
      status: "PENDING",
    });
    console.log("upto end");
    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    };
  }

  static async verifyPayment(
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
  ) {
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await Order.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: ORDER_STATUS.FAILED },
      );
      throw new ErrorRes(
        "Invalid signature, Payment failed.",
        StatusCodes.BAD_REQUEST,
      );
    }

    const order = await Order.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { status: ORDER_STATUS.PAID, paymentId: razorpay_payment_id },
      { new: true },
    );

    return order;
  }

  static async cancelOrder(orderId: string) {
    await Order.findOneAndUpdate({ orderId }, { status: "CANCELLED" });
  }

  static async hasPurchased(userId: string, courseId: string) {
    return !!(await Order.exists({
      user: userId,
      course: courseId,
      status: ORDER_STATUS.PAID,
    }));
  }

  //  My purchased courses
  static async getMyOrders(userId: string) {
    return Order.find({
      user: userId,
      status: ORDER_STATUS.PAID,
    })
      .populate("course")
      .lean();
  }
}
