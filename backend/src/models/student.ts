import {
  model,
  models,
  Schema,
  type Document,
  type HydratedDocument,
  type Model,
} from "mongoose";
import bcrypt from "bcryptjs";
import type { IStudent } from "@satheomkar24/common-types";

// Document type: includes fields + instance methods
export interface IStudentMethods {
  comparePassword(password: string): Promise<boolean>;
}

export type StudentDocument = HydratedDocument<IStudent, IStudentMethods>;

// Schema: only fields (IStudent)
const studentSchema = new Schema(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // exclude by default
    },
  },
  { timestamps: true }
);

// Pre-save hook: hash password
studentSchema.pre<StudentDocument>("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Instance method: compare password
studentSchema.methods.comparePassword = async function (
  this: StudentDocument,
  newPassword: string
): Promise<boolean> {
  return bcrypt.compare(newPassword, this.password);
};

// Model type
export type StudentModel = Model<StudentDocument>;

// Export the model (check if already compiled)
export const Student: StudentModel =
  (models.Student as StudentModel) ||
  model<StudentDocument>("Student", studentSchema);
