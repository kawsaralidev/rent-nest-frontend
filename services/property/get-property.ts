import { api } from "@/lib/api/api";
import { IGetPropertyResponse } from "@/lib/types/property";

export const getProperty = async (
  id: string,
): Promise<IGetPropertyResponse> => {
  return await api({
    endpoint: `/properties/${id}`,
    method: "GET",
  });
};
