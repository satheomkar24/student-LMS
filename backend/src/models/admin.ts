import mongoose, {
  model,
  Schema,
  type HydratedDocument,
  type Model,
} from "mongoose";
import bcrypt from "bcryptjs";
import type { IAdmin } from "@satheomkar24/common-types";

// Document type: includes fields + instance methods
export interface IAdminMethods {
  comparePassword(password: string): Promise<boolean>;
}

export type AdminDocument = HydratedDocument<IAdmin, IAdminMethods>;

// Schema: only fields (IAdmin)
const adminSchema = new Schema(
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
adminSchema.pre<AdminDocument>("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Instance method: compare password
adminSchema.methods.comparePassword = async function (
  this: AdminDocument,
  newPassword: string
): Promise<boolean> {
  console.log("📢[admin.ts:52]: ", newPassword, this.password);
  return bcrypt.compare(newPassword, this.password);
};

// Model type
export type AdminModel = Model<AdminDocument>;

// Export the model (check if already compiled)
export const Admin: AdminModel =
  (mongoose.models.Admin as AdminModel) ||
  model<AdminDocument>("Admin", adminSchema);
