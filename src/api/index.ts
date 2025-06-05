import { APP_BASE_URL } from "@/constants";
import { RequestBody, RequestOptions } from "@/types";
import { getAllCookiesString } from "@/utils";

/**
 * NativeFetch - A fetch-based API client with automatic cookie handling
 * and consistent error management
 */

class NativeFetchClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async prepareRequest(
    url: string,
    method: string,
    body?: RequestBody,
    options: RequestOptions = {}
  ): Promise<Request> {
    // Get all cookies as a string if includeCookies is true
    const cookiesString = options.includeCookies
      ? await getAllCookiesString()
      : null;

    // Prepare URL with query parameters if any
    let fullUrl = this.baseUrl + url;
    if (options.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        searchParams.append(key, value);
      });
      fullUrl += `?${searchParams.toString()}`;
    }

    // Prepare headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      cache: "force-cache",
      ...(cookiesString ? { Cookie: cookiesString } : {}),
      ...options.headers,
    };

    // If body is FormData, don't set Content-Type to let the browser set it
    if (body instanceof FormData) {
      delete headers["Content-Type"];
    }

    // Create request init object
    const requestInit: RequestInit = {
      method,
      headers,
      credentials: "include",
    };

    // Add body if provided
    if (body) {
      if (body instanceof FormData) {
        requestInit.body = body;
      } else {
        requestInit.body = JSON.stringify(body);
      }
    }

    return new Request(fullUrl, requestInit);
  }

  private async processResponse<T>(
    response: Response,
    options: RequestOptions = {}
  ): Promise<T> {
    if (!response.ok) {
      // Try to get error details from response if possible
      let errorMessage = `HTTP error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = `${errorMessage}, Details: ${JSON.stringify(errorData)}`;
      } catch (e) {
        console.error(e);
        // If we can't parse error as JSON, just use status message
      }
      throw new Error(errorMessage);
    }

    // Process response based on the requested type
    const responseType = options.responseType ?? "json";

    switch (responseType) {
      case "text":
        return (await response.text()) as unknown as T;
      case "blob":
        return (await response.blob()) as unknown as T;
      case "arrayBuffer":
        return (await response.arrayBuffer()) as unknown as T;
      case "formData":
        return (await response.formData()) as unknown as T;
      case "json":
      default:
        return (await response.json()) as T;
    }
  }

  async get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const request = await this.prepareRequest(url, "GET", undefined, options);
    const response = await fetch(request);
    return this.processResponse<T>(response, options);
  }

  async post<T>(
    url: string,
    data?: RequestBody,
    options: RequestOptions = {}
  ): Promise<T> {
    const request = await this.prepareRequest(url, "POST", data, options);
    const response = await fetch(request);
    return this.processResponse<T>(response, options);
  }

  async put<T>(
    url: string,
    data?: RequestBody,
    options: RequestOptions = {}
  ): Promise<T> {
    const request = await this.prepareRequest(url, "PUT", data, options);
    const response = await fetch(request);
    return this.processResponse<T>(response, options);
  }

  async patch<T>(
    url: string,
    data?: RequestBody,
    options: RequestOptions = {}
  ): Promise<T> {
    const request = await this.prepareRequest(url, "PATCH", data, options);
    const response = await fetch(request);
    return this.processResponse<T>(response, options);
  }

  async delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const request = await this.prepareRequest(
      url,
      "DELETE",
      undefined,
      options
    );
    const response = await fetch(request);
    return this.processResponse<T>(response, options);
  }
}

export const api = new NativeFetchClient(APP_BASE_URL + "/api");
