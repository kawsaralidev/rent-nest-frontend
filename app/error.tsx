"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border bg-card p-8 text-center shadow-lg">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold tracking-tight">
          Unable to connect right now
        </h1>

        {/* Description */}
        <p className="mt-3 leading-7 text-muted-foreground">
          We&apos;re having trouble connecting to our servers. Please check your
          internet connection and try again.
        </p>

        {/* Try Again */}
        <Button onClick={() => reset()} className="mt-7 rounded-xl px-6">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>

        {/* Help text */}
        <p className="mt-5 text-xs text-muted-foreground">
          If the problem continues, please try again later.
        </p>
      </div>
    </main>
  );
}
