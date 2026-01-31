import type { Request, Response } from "express";
import { asyncHandler } from "@middlewares/error";
import { StatusCodes } from "http-status-codes";
import type { ICoursePayload } from "@satheomkar24/common-types";
import { CourseService } from "@services/course";
import { Assert } from "@utils/assert";
import { ROLES } from "@enums/index";
import { OrderService } from "@services/order";

export class CourseController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const courses = await CourseService.getAll();
    res.status(StatusCodes.OK).json(courses);
  });

  // static getById = asyncHandler(async (req: Request, res: Response) => {
  //   const { id } = req.params;
  //   Assert.required(id, "Course id");
  //   const course = await CourseService.getById(id);
  //   res.status(StatusCodes.OK).json(course);
  // });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const courseId = req.params.id;
    Assert.required(courseId, "Course id");
    const user = req.user;

    let course;

    //  Not logged in
    if (!user) {
      course = await CourseService.getPreviewCourse(courseId);
      console.log(1, course);
    }
    //  Logged in as Admin
    else if (user.role === ROLES.ADMIN) {
      course = await CourseService.getById(courseId);
      console.log(2, course);
    }
    //  Logged in but NOT purchased
    else if (!(await OrderService.hasPurchased(user.id, courseId))) {
      course = await CourseService.getPreviewCourse(courseId);
      console.log(3, course);
    }
    //  Logged in AND purchased
    else {
      course = await CourseService.getFullCourse(courseId);
      console.log(4, course);
    }

    res.json(course).status(StatusCodes.OK);
  });

  static create = asyncHandler(async (req: Request, res: Response) => {
    const payload: ICoursePayload = req.body;
    const course = await CourseService.create(payload);
    res.status(StatusCodes.CREATED).json(course);
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    Assert.required(id, "Course id");
    const payload: ICoursePayload = req.body;
    const course = await CourseService.update(id, payload);
    res.status(StatusCodes.OK).json(course);
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    Assert.required(id, "Course id");
    const course = await CourseService.delete(id);
    res.status(StatusCodes.OK).json(course);
  });
}
