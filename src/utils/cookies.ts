"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export const getAllCookiesString = async () => {
  const getAllCookies = (await cookies()).getAll();

  if (getAllCookies.length === 0) return "";

  return getAllCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
};

export const getCookieString = async (
  name: string,
  options?: { getOnlyValue: boolean }
) => {
  const cookie = (await cookies()).get(name);

  if (!cookie) {
    return "";
  }

  return options?.getOnlyValue
    ? cookie?.value
    : `${cookie?.name}=${cookie?.value};`;
};

export const deleteCookie = async (key: string) => {
  (await cookies()).delete(key);
};

export const createTokenCookie = async (
  key: string,
  value: string,
  options: Partial<ResponseCookie>
) => {
  Object.assign(options, {
    maxAge: options.maxAge || 60 * 60 * 24,
  });

  (await cookies()).set(key, value, {
    secure: false,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    ...options,
  });
};
