import { AUTH_SERVICE } from "@/services/auth";
import { ChangePasswordPayload } from "@/types";
import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

/**
 * Hook for changing user password functionality
 *
 * @returns {UseMutationResult<{ success: boolean }, Error, ChangePasswordPayload>} Mutation result object containing
 * isLoading, isError, error, and mutate function to execute password change
 *
 * @example
 * ```tsx
 * const { mutate: changePassword, isLoading } = useChangePassword();
 *
 * const handleSubmit = (data: ChangePasswordPayload) => {
 *   changePassword(data, {
 *     onSuccess: (data) => {
 *       // Handle successful password change
 *     }
 *   });
 * };
 * ```
 */
export const useChangePassword = (): UseMutationResult<
  { success: boolean },
  Error,
  ChangePasswordPayload
> => {
  return useMutation({
    mutationKey: [AUTH_SERVICE.changePassword.name],
    mutationFn: AUTH_SERVICE.changePassword,
    onError: (error) => {
      console.error("Password change failed:", error);
    },
  });
};
