import mongoose, { Schema, model, Model, Types } from "mongoose";
import type { IRating } from "@satheomkar24/common-types";

type IRatingDocument = Omit<IRating, "_id"> & {
  _id: Types.ObjectId;
};

const ratingSchema = new Schema<IRatingDocument>(
  {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type RatingModel = Model<IRatingDocument>;

export const Rating =
  (mongoose.models.Rating as RatingModel) ||
  model<IRatingDocument>("Rating", ratingSchema);
