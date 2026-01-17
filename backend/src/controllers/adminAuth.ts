import type { Request, Response } from "express";
import type {
  IForgotPassword,
  ILogin,
  IRegisterPayload,
  IResetPasswordPayload,
} from "@satheomkar24/common-types";
import { asyncHandler } from "@middlewares/error";
import { AdminAuthService } from "@services/adminAuth";

export class AdminAuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const payload: IRegisterPayload = req.body;
    const result = await AdminAuthService.register(payload);
    res.status(201).json(result);
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const payload: ILogin = req.body;
    const result = await AdminAuthService.login(payload);
    res.status(200).json(result);
  });

  static forgotPassword = async (req: Request, res: Response) => {
    const payload: IForgotPassword = req.body;
    const result = await AdminAuthService.forgotPassword(payload);
    res.status(200).json(result);
  };

  static resetPassword = async (req: Request, res: Response) => {
    const payload: IResetPasswordPayload = req.body;
    const result = await AdminAuthService.resetPassword(payload);
    res.status(200).json(result);
  };
}
