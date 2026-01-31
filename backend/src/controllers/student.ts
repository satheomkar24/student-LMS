import type { Request, Response } from "express";
import { asyncHandler } from "@middlewares/error";
import { StatusCodes } from "http-status-codes";
import type { IStudentPayload } from "@satheomkar24/common-types";
import { StudentService } from "@services/student";
import { Assert } from "@utils/assert";

export class StudentController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const students = await StudentService.getAll();
    res.status(StatusCodes.OK).json(students);
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    Assert.required(id, "Student id");
    const student = await StudentService.getById(id);
    res.status(StatusCodes.OK).json(student);
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    Assert.required(id, "Student id");
    const payload: IStudentPayload = req.body;
    const student = await StudentService.update(id, payload);
    res.status(StatusCodes.OK).json(student);
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    Assert.required(id, "Student id");
    const student = await StudentService.delete(id);
    res.status(StatusCodes.OK).json(student);
  });
}
