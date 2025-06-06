import { AUTH_SERVICE } from "@/services/auth";
import { RegisterPayload, User } from "@/types";
import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

/**
 * Hook for user registration functionality
 *
 * @returns {UseMutationResult<User, Error, RegisterPayload>} Mutation result object containing
 * isLoading, isError, error, and mutate function to execute registration
 *
 * @example
 * ```tsx
 * const { mutate: register, isLoading } = useRegister();
 *
 * const handleSubmit = (data: RegisterPayload) => {
 *   register(data, {
 *     onSuccess: (data) => {
 *       // Handle successful registration
 *     }
 *   });
 * };
 * ```
 */
export const useRegister = (): UseMutationResult<
  User,
  Error,
  RegisterPayload
> => {
  return useMutation({
    mutationKey: [AUTH_SERVICE.register.name],
    mutationFn: AUTH_SERVICE.register,
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};
