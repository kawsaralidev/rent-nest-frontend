import { api } from "@/lib/api/api";
import { IPropertyResponse } from "@/lib/types/property";

interface IGetPropertiesParams {
  location?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  amenity?: string;
}

export const getProperties = async (
  params?: IGetPropertiesParams,
): Promise<IPropertyResponse> => {
  const searchParams = new URLSearchParams();

  if (params?.location) {
    searchParams.set("location", params.location);
  }

  if (params?.categoryId) {
    searchParams.set("categoryId", params.categoryId);
  }

  if (params?.minPrice) {
    searchParams.set("minPrice", params.minPrice);
  }

  if (params?.maxPrice) {
    searchParams.set("maxPrice", params.maxPrice);
  }

  if (params?.amenity) {
    searchParams.set("amenity", params.amenity);
  }

  return api({
    endpoint: `/properties?${searchParams.toString()}`,
    method: "GET",
    next: {
      tags: ["PROPERTIES"],
    },
  });
};
