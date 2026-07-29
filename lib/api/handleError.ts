export const handleError = async (response: Response) => {
  let errorMessage = "Something went wrong!";

  try {
    const error = await response.json();

    errorMessage =
      error.message || error.errorSources?.[0]?.message || errorMessage;
  } catch {
    errorMessage = response.statusText || errorMessage;
  }

  throw new Error(errorMessage);
};
