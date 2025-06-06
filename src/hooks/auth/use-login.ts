import { AUTH_SERVICE } from "@/services/auth";
import { AuthResponse, LoginPayload } from "@/types";
import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

/**
 * Hook for user authentication login functionality
 *
 * @returns {UseMutationResult<AuthResponse, Error, LoginPayload>} Mutation result object containing
 * isLoading, isError, error, and mutate function to execute login
 *
 * @example
 * ```tsx
 * const { mutate: login, isLoading } = useLogin();
 *
 * const handleSubmit = (data: LoginPayload) => {
 *   login(data, {
 *     onSuccess: (data) => {
 *       // Handle successful login
 *     }
 *   });
 * };
 * ```
 */
export const useLogin = (): UseMutationResult<
  AuthResponse,
  Error,
  LoginPayload
> => {
  return useMutation({
    mutationKey: [AUTH_SERVICE.login.name],
    mutationFn: AUTH_SERVICE.login,
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
