import type { Request, Response, NextFunction } from "express";
import { ErrorRes } from "./error";
import { StatusCodes } from "http-status-codes";
import { ROLES } from "@enums/index";

export const ownResourceOrAdmin =
  (paramKey = "id") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      throw new ErrorRes("Unauthorized", StatusCodes.UNAUTHORIZED);
    }

    if (user.role === ROLES.ADMIN) {
      return next();
    }

    if (user.role === ROLES.USER && user.id === req.params[paramKey]) {
      return next();
    }

    throw new ErrorRes("Forbidden", StatusCodes.FORBIDDEN);
  };
