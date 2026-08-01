"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { ICategory } from "@/lib/types/category";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PropertyFiltersProps {
  categories: ICategory[];
}

const PropertyFilters = ({ categories }: PropertyFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") ?? "");

  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") ?? "",
  );

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");

  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  const [amenity, setAmenity] = useState(searchParams.get("amenity") ?? "");

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);

    if (categoryId) params.set("categoryId", categoryId);

    if (minPrice) params.set("minPrice", minPrice);

    if (maxPrice) params.set("maxPrice", maxPrice);

    if (amenity) params.set("amenity", amenity.trim().toLowerCase());

    router.push(`/properties?${params.toString()}`);
  };

  const resetFilters = () => {
    setLocation("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setAmenity("");

    router.push("/properties");
  };

  return (
    <div className="mb-10 rounded-xl border bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="h-10 rounded-md border px-3"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <Input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <Input
          placeholder="Amenity (WiFi)"
          value={amenity}
          onChange={(e) => setAmenity(e.target.value)}
        />
      </div>

      <div className="mt-5 flex gap-3">
        <Button onClick={applyFilters}>Apply Filters</Button>

        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilters;
