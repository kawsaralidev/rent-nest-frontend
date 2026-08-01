"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createReviewAction } from "@/app/(dashboard)/tenant-dashboard/reviews/_actions/create-review";
import { IRental } from "@/lib/types/rental";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ReviewButtonProps {
  rental: IRental;
}

const ReviewButton = ({ rental }: ReviewButtonProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }

    if (!comment.trim()) {
      toast.error("Comment is required");
      return;
    }

    startTransition(async () => {
      const result = await createReviewAction(rental.id, rating, comment);

      if (result?.success) {
        toast.success(result.message || "Review submitted successfully");

        setOpen(false);
        setRating(5);
        setComment("");

        router.refresh();
      } else {
        toast.error(result?.message || "Failed to submit review");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Leave Review</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>

            <Input
              id="rating"
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>

            <Textarea
              id="comment"
              rows={5}
              placeholder="Write your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <Button
            className="w-full"
            disabled={isPending}
            onClick={handleSubmit}
          >
            {isPending ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewButton;
