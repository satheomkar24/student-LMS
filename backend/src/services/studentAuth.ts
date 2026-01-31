import { env } from "@config/env";
import {
  signResetToken,
  signToken,
  verifyResetToken,
  type TokenPayload,
} from "@config/jwt";
import { Student } from "models/student";
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
import { ROLES } from "@enums/index";

export class StudentAuthService {
  static async register(payload: IRegisterPayload): Promise<IGenericResponse> {
    const existingStudent = await Student.findOne({ email: payload.email });
    if (existingStudent) {
      throw new ErrorRes("Email already registered", StatusCodes.BAD_REQUEST);
    }

    const student = await Student.create(payload);

    return {
      message: "Registration successful",
      data: student,
    };
  }

  static async login(payload: ILogin): Promise<IAuthResponse> {
    const student = await Student.findOne({ email: payload.email }).select(
      "+password",
    );
    if (!student)
      throw new ErrorRes("Invalid email or password", StatusCodes.BAD_REQUEST);

    const isMatch = await student.comparePassword(payload.password);
    if (!isMatch) {
      logger.warn(`Invalid password attempt for ${payload.email}`);
      throw new ErrorRes("Invalid email or password", StatusCodes.BAD_REQUEST);
    }
    const jwtPayload = {
      id: student._id.toString(),
      role: ROLES.USER,
      email: student.email,
    };
    const accessToken = signToken(jwtPayload, env.JWT_EXPIRES_IN);
    const refreshToken = signToken(jwtPayload, env.REFRESH_TOKEN_EXPIRES_IN);

    return {
      accessToken,
      refreshToken,
      user: {
        id: student._id.toString(),
        name: student.name,
        email: student.email,
      },
    };
  }

  static async forgotPassword(
    payload: IForgotPassword,
  ): Promise<IGenericResponse> {
    const student = await Student.findOne({ email: payload.email });

    if (!student) {
      return {
        message: "If account exists, Password reset link sent to email",
      };
    }

    const resetToken = signResetToken({
      id: student._id.toString(),
      role: ROLES.USER,
      email: student.email,
    });

    const resetUrl = `${env.FRONTEND_USER_URL}/auth/reset-password/${resetToken}`;

    await sendEmail({
      to: student.email,
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

    const student = await Student.findById(decoded.id).select("+password");

    if (!student) {
      throw new ErrorRes("User not found", StatusCodes.BAD_REQUEST);
    }

    student.password = payload.password;
    await student.save();

    return {
      message: "Password reset successful",
    };
  }
}
