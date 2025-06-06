import { changePasswordSchema, loginSchema, registerSchema } from "@/schemas";
import { z } from "zod";
import { User } from "../user";

// Extract types from schemas
export type LoginPayload = z.infer<typeof loginSchema>;
export type RegisterPayload = Omit<
  z.infer<typeof registerSchema>,
  "confirmPassword"
>;
export type ChangePasswordPayload = Omit<
  z.infer<typeof changePasswordSchema>,
  "confirm_new_password"
>;

export interface RefreshTokenPayload {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}
