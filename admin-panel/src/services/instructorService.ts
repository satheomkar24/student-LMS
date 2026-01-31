import type {
  IInstructor,
  IInstructorPayload,
} from "@satheomkar24/common-types";
import { apiService } from "./apiService";

class InstructorService {
  private base = "/instructors";

  async getAll() {
    return await apiService.get<IInstructor[]>(this.base);
  }
  async getById(id: string) {
    return await apiService.get<IInstructor>(this.base + `/${id}`);
  }
  async create(data: IInstructorPayload) {
    return await apiService.post<IInstructor>(this.base, data);
  }
  async update(id: string, data: IInstructorPayload) {
    return await apiService.put<IInstructor>(this.base + `/${id}`, data);
  }
  async delete(id: string) {
    return await apiService.delete<{ message: string }>(this.base + `/${id}`);
  }
}
export const instructorsService = new InstructorService();
