import type { ORDER_STATUS } from "@enums/index";
import type { Types } from "mongoose";

export type IOrder = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  course: Types.ObjectId;
  amount: number;
  status: ORDER_STATUS;
  paymentId?: string;
  paidAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
