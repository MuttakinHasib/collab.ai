export type RequestOptions = {
  params?: Record<string, string>;
  headers?: Record<string, string>;
  responseType?: "json" | "text" | "blob" | "arrayBuffer" | "formData";
  includeCookies?: boolean;
};

export type RequestBody = Record<string, unknown> | FormData;
