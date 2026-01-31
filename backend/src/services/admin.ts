import { Admin } from "@models/admin";
import type {
  IGenericResponse,
  IAdmin,
  IAdminPayload,
} from "@satheomkar24/common-types";
import { Assert } from "@utils/assert";

export class AdminService {
  static async getAll(): Promise<IAdmin[]> {
    return Admin.find();
  }

  static async getById(id: string): Promise<IAdmin> {
    const admin = await Admin.findById(id).lean();
    Assert.entityFound(admin, "Admin");
    return admin as unknown as IAdmin;
  }

  static async update(
    id: string,
    payload: IAdminPayload,
  ): Promise<IGenericResponse> {
    const admin = await Admin.findByIdAndUpdate(id, payload, {
      new: true, // return updated doc
      runValidators: true, // validate schema
    });
    Assert.entityFound(admin, "Admin");
    return {
      message: "Admin updated successfully",
    };
  }

  static async delete(id: string): Promise<IGenericResponse> {
    const admin = await Admin.findByIdAndDelete(id);
    Assert.entityFound(admin, "Admin");
    return {
      message: "Admin deleted successfully",
    };
  }
}
