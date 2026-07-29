"use client";

import React, { useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { loginAction } from "@/app/(auth)/_actions/auth.actions";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialState = {
  success: false,
  statusCode: 0,
  message: "",
};

export default function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, action, pending] = useActionState(
    loginAction.bind(null, redirectTo),
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
    <form action={action} className="space-y-4">
      <Card className="space-y-4 p-6">
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Logging in..." : "Login"}
        </Button>
      </Card>
    </form>
  );
}
