export const handleError = async (response: Response): Promise<never> => {
  let errorMessage = "Request failed.";

  try {
    const error = await response.json();

    errorMessage =
      error?.message ||
      error?.errorSources?.[0]?.message ||
      error?.errorDetails?.[0]?.message ||
      response.statusText ||
      "Request failed.";
  } catch {
    errorMessage = response.statusText || "Request failed.";
  }

  throw new Error(errorMessage);
};
