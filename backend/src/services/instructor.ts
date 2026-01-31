import { ErrorRes } from "@middlewares/error";
import { Instructor } from "@models/instructor";
import type {
  IGenericResponse,
  IInstructor,
  IInstructorPayload,
} from "@satheomkar24/common-types";
import { Assert } from "@utils/assert";
import { logger } from "@utils/logger";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

export class InstructorService {
  static async getAll(): Promise<IInstructor[]> {
    return Instructor.find();
  }

  static async getById(id: string): Promise<IInstructor> {
    const instructor = await Instructor.findById(id)
      .populate({
        path: "courses",
        select: "name image price level category",
      })
      .lean();
    Assert.entityFound(instructor, "Instructor");
    return instructor as unknown as IInstructor;
  }

  static async create(payload: IInstructorPayload): Promise<IGenericResponse> {
    await Instructor.create(payload);
    return {
      message: "Instructor created successfully",
    };
  }

  static async update(
    id: string,
    payload: IInstructorPayload,
  ): Promise<IGenericResponse> {
    const instructor = await Instructor.findByIdAndUpdate(id, payload, {
      new: true, // return updated doc
      runValidators: true, // validate schema
    });
    Assert.entityFound(instructor, "Instructor");
    return {
      message: "Instructor updated successfully",
    };
  }

  static async delete(id: string): Promise<IGenericResponse> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const instructor = await Instructor.findById(id).session(session);
      Assert.entityFound(instructor, "Instructor");

      // Block delete if courses exist
      if (instructor.courses.length > 0) {
        throw new ErrorRes(
          "Cannot delete instructor with assigned courses",
          StatusCodes.BAD_REQUEST,
        );
      }

      // Delete instructor
      await Instructor.deleteOne({ _id: instructor._id }, { session });

      await session.commitTransaction();

      return { message: "Instructor deleted successfully" };
    } catch (err) {
      await session.abortTransaction();

      logger.error("Instructor delete failed:", err);
      throw err;
    } finally {
      session.endSession();
    }
  }
}
