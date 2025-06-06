import { api } from "@/api";
import { ENDPOINTS } from "@/constants";
import {
  AuthResponse,
  ChangePasswordPayload,
  LoginPayload,
  RefreshTokenPayload,
  RefreshTokenResponse,
  RegisterPayload,
  User,
} from "@/types";

class AuthService {
  public async login(payload: LoginPayload): Promise<AuthResponse> {
    return await api.post(ENDPOINTS.AUTH.LOGIN, payload);
  }

  public async register(payload: RegisterPayload): Promise<User> {
    return await api.post(ENDPOINTS.AUTH.REGISTER, payload);
  }

  public async changePassword(
    payload: ChangePasswordPayload
  ): Promise<{ success: boolean }> {
    return await api.post(ENDPOINTS.AUTH.CHANGE_PASSWORD, payload);
  }

  public async refreshToken(
    payload: RefreshTokenPayload
  ): Promise<RefreshTokenResponse> {
    return await api.post(ENDPOINTS.AUTH.REFRESH_TOKEN, payload);
  }

  public async logout(): Promise<{ success: boolean }> {
    return await api.post(ENDPOINTS.AUTH.LOGOUT, {});
  }
}

export const AUTH_SERVICE = new AuthService();
