// import { handleError } from "./handleError";

// const BASE_URL = process.env.BACKEND_API_URL!;

// type FetchOptions = RequestInit & {
//   endpoint: string;
// };

// export const api = async ({ endpoint, ...options }: FetchOptions) => {
//   const response = await fetch(`${BASE_URL}${endpoint}`, {
//     ...options,
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     await handleError(response);
//   }

//   return response.json();
// };

import { cookies } from "next/headers";

import { handleError } from "./handleError";

const BASE_URL = process.env.BACKEND_API_URL!;

type FetchOptions = RequestInit & {
  endpoint: string;
};

export const api = async ({ endpoint, headers, ...options }: FetchOptions) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...(accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    await handleError(response);
  }

  return response.json();
};
