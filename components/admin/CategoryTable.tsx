"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";

import { ICategory, ICreateCategoryResponse } from "@/lib/types/category";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createCategoryAction } from "@/app/(dashboard)/admin-dashboard/categories/create-category";
import { updateCategoryAction } from "@/app/(dashboard)/admin-dashboard/categories/update-category";
import { deleteCategoryAction } from "@/app/(dashboard)/admin-dashboard/categories/delete-category";

interface Props {
  categories: ICategory[];
}

const ITEMS_PER_PAGE = 10;

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

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [isPending, startTransition] = useTransition();

  const [state, formAction, isFormPending] = useActionState(
    mode === "create" ? createCategoryAction : updateCategoryAction,
    initialState,
  );

  /* =========================
      SEARCH
  ========================== */

  const filteredCategories = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return categories;
    }

    return categories.filter((category) =>
      category.name.toLowerCase().includes(keyword),
    );
  }, [categories, search]);

  /* =========================
      PAGINATION
  ========================== */

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startItem =
    filteredCategories.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredCategories.length,
  );

  /* =========================
      FORM RESPONSE
  ========================== */

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

  /* =========================
      RESET SEARCH
  ========================== */

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  /* =========================
      RESET FORM
  ========================== */

  const handleCancelEdit = () => {
    setMode("create");
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-6">
      {/* =========================
          CREATE / UPDATE
      ========================== */}

      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-foreground">
            {mode === "create" ? "Create Category" : "Update Category"}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "create"
              ? "Add a new property category."
              : "Update the selected category."}
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-3 md:flex-row">
          {/* ID for edit */}
          {mode === "edit" && (
            <input type="hidden" name="id" value={selectedCategory?.id ?? ""} />
          )}

          <Input
            name="name"
            placeholder="Category name"
            defaultValue={selectedCategory?.name ?? ""}
            required
            className="bg-background md:max-w-md"
          />

          <Button type="submit" disabled={isFormPending}>
            {isFormPending
              ? mode === "create"
                ? "Creating..."
                : "Updating..."
              : mode === "create"
                ? "Create"
                : "Update"}
          </Button>

          {mode === "edit" && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelEdit}
              disabled={isFormPending}
            >
              Cancel
            </Button>
          )}
        </form>
      </div>

      {/* =========================
          SEARCH HEADER
      ========================== */}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search categories..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full bg-background md:max-w-md"
        />

        <p className="text-sm text-muted-foreground">
          Total Categories:{" "}
          <span className="font-semibold text-foreground">
            {filteredCategories.length}
          </span>
        </p>
      </div>

      {/* =========================
          EMPTY SEARCH RESULT
      ========================== */}

      {categories.length > 0 && filteredCategories.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-sm">
          <p className="text-muted-foreground">
            No categories match your search.
          </p>

          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSearch("");
              setCurrentPage(1);
            }}
          >
            Clear Search
          </Button>
        </div>
      ) : (
        <>
          {/* =========================
              CATEGORY TABLE
          ========================== */}

          <div className="w-full overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="min-w-full">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Created
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-border last:border-b-0 transition-colors hover:bg-accent/40"
                  >
                    {/* Name */}
                    <td className="px-6 py-4 font-medium text-foreground">
                      {category.name}
                    </td>

                    {/* Created */}
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
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
                          {isPending ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* No categories */}
            {categories.length === 0 && (
              <div className="p-10 text-center">
                <p className="text-muted-foreground">No categories found.</p>
              </div>
            )}
          </div>

          {/* =========================
              PAGINATION
          ========================== */}

          {filteredCategories.length > 0 && totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-4 shadow-sm md:flex-row">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {startItem}
                </span>{" "}
                -
                <span className="font-semibold text-foreground">
                  {" "}
                  {endItem}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {filteredCategories.length}
                </span>{" "}
                categories
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </Button>

                <span className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground">
                  {currentPage} / {Math.max(totalPages, 1)}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages || totalPages === 0}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
