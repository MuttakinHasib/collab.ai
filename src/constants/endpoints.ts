export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    CHANGE_PASSWORD: "/auth/change-password",

    REFRESH_TOKEN: "/auth/token/refresh",
  },
} as const;
