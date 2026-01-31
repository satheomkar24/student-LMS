import type { IInstructor } from "@satheomkar24/common-types";
import mongoose, { Schema, model, Model } from "mongoose";

type IInstructorDocument = Omit<IInstructor, "courses" | "_id"> & {
  _id: mongoose.Types.ObjectId;
  courses: mongoose.Types.ObjectId[];
};

const instructorSchema = new Schema<IInstructorDocument>(
  {
    name: { type: String, required: true, trim: true },
    profession: { type: String, required: true, trim: true },
    courseCount: { type: Number, default: 0 },
    totalStudents: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    about: { type: String, required: true },
    image: { type: String },

    contactDetails: {
      email: { type: String, required: true, lowercase: true, trim: true },
      mobile: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
    },

    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      facebook: { type: String },
      instagram: { type: String },
    },

    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true },
);

export type InstructorModel = Model<IInstructorDocument>;

export const Instructor =
  (mongoose.models.Instructor as InstructorModel) ||
  model<IInstructorDocument>("Instructor", instructorSchema);
