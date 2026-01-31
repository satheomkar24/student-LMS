import { ORDER_STATUS } from "@enums/index";
import mongoose, { Model, Schema, model } from "mongoose";
import type { IOrder } from "types";

type IOrderDocument = IOrder & {
  orderId: string;
};

const orderSchema = new Schema<IOrderDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    orderId: { type: String, required: true }, // Razorpay order ID
    paymentId: { type: String }, // Razorpay payment ID
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
  },
  { timestamps: true },
);

//  One user can buy one course only once
orderSchema.index(
  { user: 1, course: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: "PAID",
    },
  },
);

export type OrderModel = Model<IOrderDocument>;

export const Order =
  (mongoose.models.Order as OrderModel) ||
  model<IOrderDocument>("Order", orderSchema);
