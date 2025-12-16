import { env } from "@config/env";
import { signToken } from "@config/jwt";
import { Student } from "models/student";
import type {
  IAuthResponse,
  IGenericResponse,
  ILogin,
  IRegisterPayload,
} from "@satheomkar24/common-types";
import { ErrorRes } from "@middlewares/error";
import { StatusCodes } from "http-status-codes";

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
    const student = await Student.findOne({ email: payload.email });
    if (!student)
      throw new ErrorRes("Invalid email or password", StatusCodes.BAD_REQUEST);

    const isMatch = await student.comparePassword(payload.password);
    if (!isMatch)
      throw new ErrorRes("Invalid email or password", StatusCodes.BAD_REQUEST);

    const jwtPayload = { id: student._id };
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
}
