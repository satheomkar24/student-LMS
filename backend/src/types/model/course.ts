import { Types } from "mongoose";
import { type ICourse } from "@satheomkar24/common-types";

export type ICourseDocument = Omit<
  ICourse,
  "lessons" | "faqs" | "instructor" | "rating" | "_id"
> & {
  _id: Types.ObjectId;
  lessons: Types.ObjectId[];
  faqs: Types.ObjectId[];
  instructor: Types.ObjectId;
  rating?: Types.ObjectId;
};
