import type { IFAQ } from "@satheomkar24/common-types";
import mongoose, { Schema, model, Model, Types } from "mongoose";

type IFAQDocument = Omit<IFAQ, "_id"> & {
  _id: Types.ObjectId;
};

const faqSchema = new Schema<IFAQDocument>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export type FAQModel = Model<IFAQDocument>;

export const FAQ =
  (mongoose.models.FAQ as FAQModel) || model<IFAQDocument>("FAQ", faqSchema);
