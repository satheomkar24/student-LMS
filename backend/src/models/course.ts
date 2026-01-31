import mongoose, { Schema, model, Types, Model } from "mongoose";
import type { ICourseDocument } from "types";

const courseSchema = new Schema<ICourseDocument>(
  {
    name: { type: String, required: true },
    image: { type: String },
    summery: { type: String },
    details: { type: String },

    price: { type: Number },
    level: { type: String },
    category: { type: String },

    lessons: [{ type: Types.ObjectId, ref: "Lesson" }],

    faqs: [{ type: Types.ObjectId, ref: "FAQ" }],

    instructor: {
      type: Types.ObjectId,
      ref: "Instructor",
    },

    rating: {
      type: Types.ObjectId,
      ref: "Rating",
    },

    publish: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type CourseModel = Model<ICourseDocument>;

export const Course =
  (mongoose.models.Course as CourseModel) ||
  model<ICourseDocument>("Course", courseSchema);
