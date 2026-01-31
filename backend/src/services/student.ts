import { Student } from "@models/student";
import type {
  IGenericResponse,
  IStudent,
  IStudentPayload,
} from "@satheomkar24/common-types";
import { Assert } from "@utils/assert";

export class StudentService {
  static async getAll(): Promise<IStudent[]> {
    return Student.find();
  }

  static async getById(id: string): Promise<IStudent> {
    const student = await Student.findById(id).populate("courses").lean();
    Assert.entityFound(student, "Student");
    return student;
  }

  static async update(
    id: string,
    payload: IStudentPayload,
  ): Promise<IGenericResponse> {
    const student = await Student.findByIdAndUpdate(id, payload, {
      new: true, // return updated doc
      runValidators: true, // validate schema
    });
    Assert.entityFound(student, "Student");
    return {
      message: "Student updated successfully",
    };
  }

  static async delete(id: string): Promise<IGenericResponse> {
    const student = await Student.findByIdAndDelete(id);
    Assert.entityFound(student, "Student");
    return {
      message: "Student deleted successfully",
    };
  }
}
