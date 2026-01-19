import type { IInstructor } from "@satheomkar24/common-types";
import { apiService } from "./apiService";

class InstructorService {
  private base = "/instructors";

  async getAll() {
    return await apiService.get<IInstructor[]>(this.base);
  }
  async getById(id: string) {
    return await apiService.get<IInstructor>(this.base + `/${id}`);
  }
}
export const instructorsService = new InstructorService();
