import type { Request, Response } from "express";
import { asyncHandler } from "@middlewares/error";
import { StatusCodes } from "http-status-codes";
import type { IInstructorPayload } from "@satheomkar24/common-types";
import { InstructorService } from "@services/instructor";
import { Assert } from "@utils/assert";

export class InstructorController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const instructors = await InstructorService.getAll();
    res.status(StatusCodes.OK).json(instructors);
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    Assert.required(id, "Instructor id");
    const instructor = await InstructorService.getById(id);
    res.status(StatusCodes.OK).json(instructor);
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const payload: IInstructorPayload = req.body;
    const instructor = await InstructorService.create(payload);
    res.status(StatusCodes.CREATED).json(instructor);
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    Assert.required(id, "Instructor id");
    const payload: IInstructorPayload = req.body;
    const instructor = await InstructorService.update(id, payload);
    res.status(StatusCodes.OK).json(instructor);
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    Assert.required(id, "Instructor id");
    const instructor = await InstructorService.delete(id);
    res.status(StatusCodes.OK).json(instructor);
  });
}
