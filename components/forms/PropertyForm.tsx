"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { createPropertyAction } from "@/app/(dashboard)/landlord-dashboard/properties/_actions/create-property";
import { updatePropertyAction } from "@/app/(dashboard)/landlord-dashboard/properties/_actions/update-property";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { ICreatePropertyResponse, IProperty } from "@/lib/types/property";

import { ICategory } from "@/lib/types/category";

interface PropertyFormProps {
  mode?: "create" | "edit";
  categories: ICategory[];
  property?: IProperty;
  onSuccess?: () => void;
}

const initialState: ICreatePropertyResponse = {
  success: false,
  message: "",
  data: {} as IProperty,
};

export default function PropertyForm({
  mode = "create",
  categories,
  property,
  onSuccess,
}: PropertyFormProps) {
  const [state, formAction, isPending] = useActionState(
    mode === "create" ? createPropertyAction : updatePropertyAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);

      if (mode === "edit") {
        onSuccess?.();
      }
    } else {
      toast.error(state.message);
    }
  }, [state, mode, onSuccess]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Add Property" : "Update Property"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-6">
          {mode === "edit" && (
            <input type="hidden" name="id" value={property?.id} />
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>

            <Input
              id="title"
              name="title"
              placeholder="e.g. Modern 3 Bedroom Apartment"
              defaultValue={property?.title}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Describe the property, location, facilities and living experience..."
              defaultValue={property?.description}
              required
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>

            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="https://example.com/property.jpg"
              defaultValue={property?.imageUrl}
            />
          </div>

          {/* Bedrooms / Bathrooms / Area */}
          <div className="grid gap-5 sm:grid-cols-3">
            {/* Bedrooms */}
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>

              <Input
                id="bedrooms"
                name="bedrooms"
                type="number"
                min={1}
                placeholder="e.g. 3"
                defaultValue={property?.bedrooms ?? 1}
                required
              />
            </div>

            {/* Bathrooms */}
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>

              <Input
                id="bathrooms"
                name="bathrooms"
                type="number"
                min={1}
                placeholder="e.g. 2"
                defaultValue={property?.bathrooms ?? 1}
                required
              />
            </div>

            {/* Area */}
            <div className="space-y-2">
              <Label htmlFor="area">Area (sq ft)</Label>

              <Input
                id="area"
                name="area"
                type="number"
                min={1}
                placeholder="e.g. 1200"
                defaultValue={property?.area ?? 500}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>

            <Input
              id="location"
              name="location"
              placeholder="e.g. Uttara, Dhaka"
              defaultValue={property?.location}
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Monthly Rent</Label>

            <Input
              id="price"
              name="price"
              type="number"
              min={1}
              placeholder="Monthly rent"
              defaultValue={property?.price}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>

            <select
              id="categoryId"
              name="categoryId"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              defaultValue={property?.category?.id ?? ""}
              required
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities (comma separated)</Label>

            <Input
              id="amenities"
              name="amenities"
              placeholder="WiFi, Parking, Lift, Security"
              defaultValue={property?.amenities?.join(", ")}
              required
            />

            <p className="text-xs text-muted-foreground">
              Example: WiFi, Parking, Lift, Security
            </p>
          </div>

          {/* Featured Property */}
          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
            <input
              id="isFeatured"
              name="isFeatured"
              type="checkbox"
              value="true"
              defaultChecked={property?.isFeatured ?? false}
              className="h-4 w-4 rounded border-gray-300"
            />

            <div>
              <Label
                htmlFor="isFeatured"
                className="cursor-pointer font-semibold"
              >
                Featured Property
              </Label>

              <p className="text-xs text-muted-foreground">
                Highlight this property in the featured section.
              </p>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending
              ? mode === "create"
                ? "Creating..."
                : "Updating..."
              : mode === "create"
                ? "Create Property"
                : "Update Property"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
