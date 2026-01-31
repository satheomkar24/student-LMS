import type { ILesson } from "@satheomkar24/common-types";
import mongoose, { Schema, model, Model, Types } from "mongoose";

type ILessonDocument = Omit<ILesson, "_id"> & {
  _id: Types.ObjectId;
};

const lessonSchema = new Schema<ILessonDocument>(
  {
    name: { type: String, required: true, trim: true },
    video: { type: String, required: true },
    duration: { type: String, required: true },
  },
  { timestamps: true },
);

export type LessonModel = Model<ILessonDocument>;

export const Lesson =
  (mongoose.models.Lesson as LessonModel) ||
  model<ILessonDocument>("Lesson", lessonSchema);
