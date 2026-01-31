import type { IStudent, IStudentPayload } from "@satheomkar24/common-types";
import { apiService } from "./apiService";

class StudentService {
  private base = "/students";

  async getAll() {
    return await apiService.get<IStudent[]>(this.base);
  }
  async getById(id: string) {
    return await apiService.get<IStudent>(this.base + `/${id}`);
  }
  async create(data: IStudentPayload) {
    return await apiService.post<IStudent>(this.base, data);
  }
  async update(id: string, data: IStudentPayload) {
    return await apiService.put<IStudent>(this.base + `/${id}`, data);
  }
  async delete(id: string) {
    return await apiService.delete<{ message: string }>(this.base + `/${id}`);
  }
}
export const studentsService = new StudentService();
