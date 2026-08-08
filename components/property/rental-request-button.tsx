"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { createRentalAction } from "@/app/(public)/properties/_actions/rental.actions";

type RequestRentalButtonProps = {
  propertyId: string;
  availability: boolean;
  isLoggedIn: boolean;
};

const RequestRentalButton = ({
  propertyId,
  availability,
  isLoggedIn,
}: RequestRentalButtonProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleRequest = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    startTransition(async () => {
      try {
        const result = await createRentalAction(propertyId);

        if (result?.success === false) {
          toast.error(
            result.message || "We couldn't process your rental request.",
          );
          return;
        }

        toast.success(
          result?.message || "Rental request submitted successfully.",
        );

        router.refresh();
      } catch (error) {
        console.error("Rental request error:", error);

        const errorMessage =
          error instanceof Error ? error.message.toLowerCase() : "";

        const isNetworkError =
          errorMessage.includes("fetch failed") ||
          errorMessage.includes("failed to fetch") ||
          errorMessage.includes("network") ||
          errorMessage.includes("connection") ||
          errorMessage.includes("econnrefused");

        if (isNetworkError) {
          toast.error(
            "Unable to connect right now. Please check your internet connection and try again.",
          );
        } else {
          toast.error(
            "We couldn't submit your rental request right now. Please try again.",
          );
        }
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
