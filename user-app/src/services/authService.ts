import type { NavigateFunction } from "react-router-dom";
import { resetAuth } from "../store/authSlice";
import { apiService } from "./apiService";
import type { AppDispatch } from "../store";
import type {
  IAuthResponse,
  IForgotPassword,
  IGenericResponse,
  ILogin,
  IRegisterPayload,
  IResetPasswordPayload,
} from "@satheomkar24/common-types";

class AuthService {
  private navigate!: NavigateFunction;
  private dispatch!: AppDispatch;

  init(navigate: NavigateFunction, dispatch: AppDispatch) {
    this.navigate = navigate;
    this.dispatch = dispatch;
  }

  async register(data: IRegisterPayload) {
    return await apiService.post<IGenericResponse>("/register", data);
  }

  async login(data: ILogin) {
    return await apiService.post<IAuthResponse>("/login", data);
  }

  async forgotPassword(data: IForgotPassword) {
    return await apiService.post<IGenericResponse>("/forgot", data);
  }

  async resetPassword(body: IResetPasswordPayload) {
    return await apiService.post<IGenericResponse>("/reset", body);
  }

  logout() {
    this.dispatch(resetAuth());
    this.navigate("/auth/login", { replace: true });
  }
}

export const authService = new AuthService();
