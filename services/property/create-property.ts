import { api } from "@/lib/api/api";
import {
  ICreatePropertyPayload,
  ICreatePropertyResponse,
} from "@/lib/types/property";

export const createProperty = async (
  payload: ICreatePropertyPayload,
): Promise<ICreatePropertyResponse> => {
  return await api({
    endpoint: "/landlord/properties",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
