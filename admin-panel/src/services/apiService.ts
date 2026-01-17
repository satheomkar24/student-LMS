import { AxiosInstanceService } from "@satheomkar24/common-types";
import constant from "../constant";

export const apiService = new AxiosInstanceService(constant.backendAPIUrl);
