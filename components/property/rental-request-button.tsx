"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { createRentalAction } from "@/app/(public)/properties/_actions/rental.actions";

type RequestRentalButtonProps = {
  propertyId: string;
  availability: boolean;
};

const RequestRentalButton = ({
  propertyId,
  availability,
}: RequestRentalButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRequest = () => {
    startTransition(async () => {
      try {
        const result = await createRentalAction(propertyId);

        toast.success(result.message);

        router.refresh();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong!",
        );
      }
    });
  };

  return (
    <Button
      onClick={handleRequest}
      disabled={!availability || isPending}
      className="w-full"
    >
      {isPending ? "Submitting..." : "Request to Rent"}
    </Button>
  );
};

export default RequestRentalButton;
