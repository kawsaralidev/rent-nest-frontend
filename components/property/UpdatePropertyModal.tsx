"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import PropertyForm from "@/components/forms/PropertyForm";

import { IProperty } from "@/lib/types/property";
import { ICategory } from "@/lib/types/category";

interface UpdatePropertyModalProps {
  property: IProperty;
  categories: ICategory[];
}

export default function UpdatePropertyModal({
  property,
  categories,
}: UpdatePropertyModalProps) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Edit</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Update Property</DialogTitle>
        </DialogHeader>

        <PropertyForm
          mode="edit"
          property={property}
          categories={categories}
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
