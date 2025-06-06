import { registerSchema } from "@/schemas";
import { AUTH_SERVICE } from "@/services";
import { RegisterPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const useRegister = () => {
  const { handleSubmit, ...form } = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: [AUTH_SERVICE.register.name],
    mutationFn: AUTH_SERVICE.register,
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      form.reset();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  });

  return {
    form,
    onSubmit,
  };
};
