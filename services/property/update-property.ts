import { api } from "@/lib/api/api";
import {
  IUpdatePropertyPayload,
  IUpdatePropertyResponse,
} from "@/lib/types/property";

export const updateProperty = async (
  id: string,
  payload: IUpdatePropertyPayload,
): Promise<IUpdatePropertyResponse> => {
  return await api({
    endpoint: `/landlord/properties/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
