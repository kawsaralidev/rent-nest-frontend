import { handleError } from "./handleError";

const BASE_URL = process.env.BACKEND_API_URL!;

type FetchOptions = RequestInit & {
  endpoint: string;
};

export const api = async ({ endpoint, ...options }: FetchOptions) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    cache: "no-store",
  });

  if (!response.ok) {
    await handleError(response);
  }

  return response.json();
};
