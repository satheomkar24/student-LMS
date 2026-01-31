import type { Request, Response } from "express";
import { asyncHandler } from "@middlewares/error";
import { StatusCodes } from "http-status-codes";
import type { IAdminPayload } from "@satheomkar24/common-types";
import { AdminService } from "@services/admin";
import { Assert } from "@utils/assert";

export class AdminController {
  static getAll = asyncHandler(async (req: Request, res: Response) => {
    const admins = await AdminService.getAll();
    res.status(StatusCodes.OK).json(admins);
  });

  static getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    Assert.required(id, "Admin id");
    const admin = await AdminService.getById(id);
    res.status(StatusCodes.OK).json(admin);
  });

  static update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    Assert.required(id, "Admin id");
    const payload: IAdminPayload = req.body;
    const admin = await AdminService.update(id, payload);
    res.status(StatusCodes.OK).json(admin);
  });

  static delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    Assert.required(id, "Admin id");
    const admin = await AdminService.delete(id);
    res.status(StatusCodes.OK).json(admin);
  });
}
