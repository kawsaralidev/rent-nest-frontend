"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deletePropertyAction } from "@/app/(dashboard)/landlord-dashboard/properties/_actions/delete-property";

interface DeleteButtonProps {
  id: string;
}

export default function DeletePropertyButton({ id }: DeleteButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        const result = await deletePropertyAction(id);

        if (result.success) {
          toast.success(result.message || "Property deleted successfully");
          router.refresh();
        } else {
          toast.error(result.message || "Failed to delete property");
        }
      } catch {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
    >
      <Trash2 className="mr-2 h-4 w-4" />
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
