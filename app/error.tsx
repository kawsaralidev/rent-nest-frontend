"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Something went wrong!</h1>

      <p className="text-muted-foreground">{error.message}</p>

      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}
