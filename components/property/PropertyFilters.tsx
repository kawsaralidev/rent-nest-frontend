"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  Bath,
  BedDouble,
  Filter,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { ICategory } from "@/lib/types/category";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PropertyFiltersProps {
  categories: ICategory[];
}

const PropertyFilters = ({ categories }: PropertyFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const [location, setLocation] = useState(searchParams.get("location") ?? "");

  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") ?? "",
  );

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") ?? "");

  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") ?? "");

  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") ?? "");

  const [bathrooms, setBathrooms] = useState(
    searchParams.get("bathrooms") ?? "",
  );

  const [amenity, setAmenity] = useState(searchParams.get("amenity") ?? "");

  const [sort, setSort] = useState(searchParams.get("sort") ?? "");

  const [featured, setFeatured] = useState(
    searchParams.get("featured") === "true",
  );

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (categoryId) {
      params.set("categoryId", categoryId);
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }

    if (bedrooms) {
      params.set("bedrooms", bedrooms);
    }

    if (bathrooms) {
      params.set("bathrooms", bathrooms);
    }

    if (amenity.trim()) {
      params.set("amenity", amenity.trim().toLowerCase());
    }

    if (featured) {
      params.set("featured", "true");
    }

    if (sort) {
      params.set("sort", sort);
    }

    params.set("page", "1");
    params.set("limit", "15");

    router.push(`/properties?${params.toString()}`);
  };

  const resetFilters = () => {
    setSearch("");
    setLocation("");
    setCategoryId("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setBathrooms("");
    setAmenity("");
    setSort("");
    setFeatured(false);

    router.push("/properties");
  };

  const selectClass =
    "h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring";

  return (
    <div className="mb-10 rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors duration-300 sm:p-5">
      {/* =========================
          FILTER HEADER
      ========================== */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <SlidersHorizontal className="h-4 w-4" />
        </div>

        <div>
          <h2 className="text-sm font-bold text-foreground">
            Find Your Property
          </h2>

          <p className="text-xs text-muted-foreground">
            Refine your search using the filters below.
          </p>
        </div>
      </div>

      {/* =========================
          TOP FILTER ROW
      ========================== */}
      <div className="flex flex-col gap-3 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 rounded-lg bg-background pl-9"
          />
        </div>

        {/* Location */}
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-10 rounded-lg bg-background pl-9"
          />
        </div>

        {/* Category */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className={`${selectClass} lg:min-w-40`}
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Min Price */}
        <Input
          type="number"
          min="0"
          placeholder="Min ৳"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="h-10 w-full rounded-lg bg-background lg:w-28"
        />

        {/* Max Price */}
        <Input
          type="number"
          min="0"
          placeholder="Max ৳"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="h-10 w-full rounded-lg bg-background lg:w-28"
        />

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={`${selectClass} lg:min-w-32`}
        >
          <option value="">Newest</option>
          <option value="price_asc">Price: Low</option>
          <option value="price_desc">Price: High</option>
        </select>
      </div>

      {/* =========================
          SECONDARY FILTERS
      ========================== */}
      <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:flex-wrap sm:items-center">
        {/* Bedrooms */}
        <div className="relative">
          <BedDouble className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className={`${selectClass} pl-9 pr-8`}
          >
            <option value="">Bedrooms</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        {/* Bathrooms */}
        <div className="relative">
          <Bath className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <select
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className={`${selectClass} pl-9 pr-8`}
          >
            <option value="">Bathrooms</option>
            <option value="1">1 Bathroom</option>
            <option value="2">2 Bathrooms</option>
            <option value="3">3 Bathrooms</option>
            <option value="4">4+ Bathrooms</option>
          </select>
        </div>

        {/* Amenity */}
        <Input
          placeholder="Amenity"
          value={amenity}
          onChange={(e) => setAmenity(e.target.value)}
          className="h-10 w-full rounded-lg bg-background sm:w-32"
        />

        {/* Featured */}
        <label className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm text-foreground transition-colors hover:bg-accent">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          Featured
        </label>

        {/* Spacer */}
        <div className="hidden flex-1 sm:block" />

        {/* Reset */}
        <Button
          type="button"
          variant="ghost"
          onClick={resetFilters}
          className="h-10 rounded-lg px-3 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>

        {/* Apply */}
        <Button
          type="button"
          onClick={applyFilters}
          className="h-10 rounded-lg px-5"
        >
          <Filter className="mr-2 h-4 w-4" />
          Apply
        </Button>
      </div>
    </div>
  );
};

export default PropertyFilters;
