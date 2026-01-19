import type { ICourse } from "@satheomkar24/common-types";
import { apiService } from "./apiService";

class CourseService {
  private base = "/courses";

  async getAll() {
    return await apiService.get<ICourse[]>(this.base);
  }
  async getById(id: string) {
    return await apiService.get<ICourse>(this.base + `/${id}`);
  }
}
export const coursesService = new CourseService();
