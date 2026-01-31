import type { IAdmin, IAdminPayload } from "@satheomkar24/common-types";
import { apiService } from "./apiService";

class AdminService {
  private base = "/admins";

  async getAll() {
    return await apiService.get<IAdmin[]>(this.base);
  }
  async getById(id: string) {
    return await apiService.get<IAdmin>(this.base + `/${id}`);
  }
  async create(data: IAdminPayload) {
    return await apiService.post<IAdmin>(this.base, data);
  }
  async update(id: string, data: IAdminPayload) {
    return await apiService.put<IAdmin>(this.base + `/${id}`, data);
  }
  async delete(id: string) {
    return await apiService.delete<{ message: string }>(this.base + `/${id}`);
  }
}
export const adminsService = new AdminService();
