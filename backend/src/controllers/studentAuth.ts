import type { Request, Response } from "express";
import type { ILogin, IRegisterPayload } from "@satheomkar24/common-types";
import { StudentAuthService } from "@services/studentAuth";
import { asyncHandler } from "@middlewares/error";

export class StudentAuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const payload: IRegisterPayload = req.body;
    const result = await StudentAuthService.register(payload);
    res.status(201).json(result);
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const payload: ILogin = req.body;
    const result = await StudentAuthService.login(payload);
    res.status(200).json(result);
  });
}
