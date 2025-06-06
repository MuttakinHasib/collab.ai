export type RequestOptions = {
  params?: Record<string, string>;
  headers?: Record<string, string>;
  responseType?: "json" | "text" | "blob" | "arrayBuffer" | "formData";
  includeCookies?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestBody = Record<string, any> | FormData;
