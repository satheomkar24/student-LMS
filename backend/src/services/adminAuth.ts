import { env } from "@config/env";
import {
  signResetToken,
  signToken,
  verifyResetToken,
  type TokenPayload,
} from "@config/jwt";
import type {
  IAuthResponse,
  IForgotPassword,
  IGenericResponse,
  ILogin,
  IRegisterPayload,
  IResetPasswordPayload,
} from "@satheomkar24/common-types";
import { ErrorRes } from "@middlewares/error";
import { StatusCodes } from "http-status-codes";
import { sendEmail } from "@utils/email";
import { logger } from "@utils/logger";
import { Admin } from "@models/admin";
import { ROLES } from "types";

export class AdminAuthService {
  static async register(payload: IRegisterPayload): Promise<IGenericResponse> {
    const existingAdmin = await Admin.findOne({ email: payload.email });
    if (existingAdmin) {
      throw new ErrorRes("Email already registered", StatusCodes.BAD_REQUEST);
    }

    const admin = await Admin.create(payload);

    return {
      message: "Registration successful",
      data: admin,
    };
  }

  static async login(payload: ILogin): Promise<IAuthResponse> {
    const admin = await Admin.findOne({ email: payload.email }).select(
      "+password",
    );
    if (!admin)
      throw new ErrorRes("Invalid email or password", StatusCodes.BAD_REQUEST);

    const isMatch = await admin.comparePassword(payload.password);
    if (!isMatch) {
      logger.warn(`Invalid password attempt for ${payload.email}`);
      throw new ErrorRes("Invalid email or password", StatusCodes.BAD_REQUEST);
    }
    const jwtPayload = {
      id: admin._id.toString(),
      role: ROLES.ADMIN,
      email: admin.email,
    };
    const accessToken = signToken(jwtPayload, env.JWT_EXPIRES_IN);
    const refreshToken = signToken(jwtPayload, env.REFRESH_TOKEN_EXPIRES_IN);

    return {
      accessToken,
      refreshToken,
      user: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
      },
    };
  }

  static async forgotPassword(
    payload: IForgotPassword,
  ): Promise<IGenericResponse> {
    const admin = await Admin.findOne({ email: payload.email });

    if (!admin) {
      return {
        message: "If account exists, Password reset link sent to email",
      };
    }

    const resetToken = signResetToken({ id: admin._id.toString() });

    const resetUrl = `${env.FRONTEND_USER_URL}/auth/reset-password/${resetToken}`;

    await sendEmail({
      to: admin.email,
      subject: "Reset your password",
      html: `
        <p>You requested a password reset</p>
        <p>Click below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link expires in 15 minutes</p>
      `,
    });

    return {
      message: "If account exists, Password reset link sent to email",
    };
  }

  static async resetPassword(
    payload: IResetPasswordPayload,
  ): Promise<IGenericResponse> {
    let decoded: TokenPayload;

    try {
      decoded = verifyResetToken(payload.token);
    } catch {
      throw new ErrorRes(
        "Token is invalid or expired",
        StatusCodes.BAD_REQUEST,
      );
    }

    const admin = await Admin.findById(decoded.id).select("+password");

    if (!admin) {
      throw new ErrorRes("User not found", StatusCodes.BAD_REQUEST);
    }

    admin.password = payload.password;
    await admin.save();

    return {
      message: "Password reset successful",
    };
  }
}
