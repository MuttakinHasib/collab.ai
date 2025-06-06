import { AUTH_SERVICE } from "@/services/auth";
import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

/**
 * Hook for user logout functionality
 *
 * @returns {UseMutationResult<{ success: boolean }, Error, void>} Mutation result object containing
 * isLoading, isError, error, and mutate function to execute logout
 *
 * @example
 * ```tsx
 * const { mutate: logout, isLoading } = useLogout();
 *
 * const handleLogout = () => {
 *   logout(undefined, {
 *     onSuccess: () => {
 *       // Handle successful logout, e.g., redirect to login page
 *     }
 *   });
 * };
 * ```
 */
export const useLogout = (): UseMutationResult<
  { success: boolean },
  Error,
  void
> => {
  return useMutation({
    mutationKey: [AUTH_SERVICE.logout.name],
    mutationFn: AUTH_SERVICE.logout,
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
};
