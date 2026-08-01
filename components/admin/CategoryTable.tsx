"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

// import { createCategoryAction } from "@/app/(dashboard)/admin-dashboard/categories/_actions/create-category";
// import { updateCategoryAction } from "@/app/(dashboard)/admin-dashboard/categories/_actions/update-category";
// import { deleteCategoryAction } from "@/app/(dashboard)/admin-dashboard/categories/_actions/delete-category";

import { ICategory, ICreateCategoryResponse } from "@/lib/types/category";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategoryAction } from "@/app/(dashboard)/admin-dashboard/categories/create-category";
import { updateCategoryAction } from "@/app/(dashboard)/admin-dashboard/categories/update-category";
import { deleteCategoryAction } from "@/app/(dashboard)/admin-dashboard/categories/delete-category";

interface Props {
  categories: ICategory[];
}

const initialState: ICreateCategoryResponse = {
  success: false,
  message: "",
  data: {} as ICategory,
};

export default function CategoryTable({ categories }: Props) {
  const [mode, setMode] = useState<"create" | "edit">("create");

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );

  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(
    mode === "create" ? createCategoryAction : updateCategoryAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);

      setTimeout(() => {
        setMode("create");
        setSelectedCategory(null);
      }, 0);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          {mode === "create" ? "Create Category" : "Update Category"}
        </h2>

        <form action={formAction} className="flex flex-col gap-4 md:flex-row">
          {mode === "edit" && (
            <input type="hidden" name="id" value={selectedCategory?.id} />
          )}

          <Input
            name="name"
            placeholder="Category name"
            defaultValue={selectedCategory?.name}
            required
          />

          <Button type="submit">
            {mode === "create" ? "Create" : "Update"}
          </Button>

          {mode === "edit" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setMode("create");
                setSelectedCategory(null);
              }}
            >
              Cancel
            </Button>
          )}
        </form>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>

              <th className="px-6 py-4 text-left">Created</th>

              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b transition-colors hover:bg-muted/30"
              >
                <td className="px-6 py-4 font-medium">{category.name}</td>

                <td className="px-6 py-4">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setMode("edit");
                        setSelectedCategory(category);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={isPending}
                      onClick={() => {
                        const confirmDelete = window.confirm(
                          `Delete "${category.name}"?`,
                        );

                        if (!confirmDelete) return;

                        startTransition(async () => {
                          const result = await deleteCategoryAction(
                            category.id,
                          );

                          if (result.success) {
                            toast.success(result.message);
                          } else if (
                            result.message.includes("Invalid reference")
                          ) {
                            toast.error(
                              "Cannot delete this category because one or more properties are using it.",
                            );
                          } else {
                            toast.error(result.message);
                          }
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <div className="p-10 text-center">
            <p className="text-muted-foreground">No categories found.</p>
          </div>
          //   </tbody>
        )}
      </div>
    </div>
  );
}
