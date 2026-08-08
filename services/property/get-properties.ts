import { api } from "@/lib/api/api";
import { IPropertyResponse } from "@/lib/types/property";

interface IGetPropertiesParams {
  page?: number;
  limit?: number;

  search?: string;

  location?: string;
  categoryId?: string;

  featured?: boolean;

  bedrooms?: number;
  bathrooms?: number;

  minPrice?: string;
  maxPrice?: string;

  amenity?: string;

  sort?: "price_asc" | "price_desc";
}

export const getProperties = async (
  params?: IGetPropertiesParams,
): Promise<IPropertyResponse> => {
  const searchParams = new URLSearchParams();

  if (params?.page) {
    searchParams.set("page", params.page.toString());
  }

  if (params?.limit) {
    searchParams.set("limit", params.limit.toString());
  }

  if (params?.search) {
    searchParams.set("search", params.search);
  }

  if (params?.location) {
    searchParams.set("location", params.location);
  }

  if (params?.categoryId) {
    searchParams.set("categoryId", params.categoryId);
  }

  if (params?.featured !== undefined) {
    searchParams.set("featured", String(params.featured));
  }

  if (params?.bedrooms) {
    searchParams.set("bedrooms", params.bedrooms.toString());
  }

  if (params?.bathrooms) {
    searchParams.set("bathrooms", params.bathrooms.toString());
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

  if (params?.sort) {
    searchParams.set("sort", params.sort);
  }

  return api({
    endpoint: `/properties?${searchParams.toString()}`,
    method: "GET",
    next: {
      tags: ["PROPERTIES"],
    },
  });
};
