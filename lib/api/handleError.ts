export const handleError = async (response: Response): Promise<never> => {
  let errorMessage = "Something went wrong!";

  try {
    const error = await response.json();

    errorMessage =
      error?.message ||
      error?.errorSources?.[0]?.message ||
      error?.errorDetails?.[0]?.message ||
      errorMessage;
  } catch {
    errorMessage = response.statusText || errorMessage;
  }

  throw new Error(errorMessage);
};
