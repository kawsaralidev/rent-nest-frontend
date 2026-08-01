"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { createPropertyAction } from "@/app/(dashboard)/landlord-dashboard/properties/_actions/create-property";
import { updatePropertyAction } from "@/app/(dashboard)/landlord-dashboard/properties/_actions/update-property";

// import { type ICategory } from "@/services/category/get-categories";

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
}: PropertyFormProps) {
  const [state, formAction, isPending] = useActionState(
    mode === "create" ? createPropertyAction : updatePropertyAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {mode === "create" ? "Add Property" : "Update Property"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form action={formAction} className="space-y-5">
          {mode === "edit" && (
            <input type="hidden" name="id" value={property?.id} />
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>

            <Input
              id="title"
              name="title"
              placeholder="Property title"
              defaultValue={property?.title}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Property description"
              defaultValue={property?.description}
              required
            />
          </div>
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

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>

            <Input
              id="location"
              name="location"
              placeholder="Location"
              defaultValue={property?.location}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>

            <Input
              id="price"
              name="price"
              type="number"
              min={0}
              placeholder="Monthly rent"
              defaultValue={property?.price}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryId">Category</Label>

            <select
              id="categoryId"
              name="categoryId"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              defaultValue={property?.category?.id}
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

          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities (comma separated)</Label>

            <Input
              id="amenities"
              name="amenities"
              placeholder="Wifi, Parking, Lift"
              defaultValue={property?.amenities?.join(", ")}
              required
            />
          </div>

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
