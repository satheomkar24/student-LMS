import type { ROLES } from "@enums/index";

export * from "./model/course";
export * from "./order";

export type Role = (typeof ROLES)[keyof typeof ROLES];
