"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/(auth)/_actions/auth.actions";

export default function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          await logoutAction();
        })
      }
      disabled={pending}
    >
      {pending ? "Logging out..." : "Logout"}
    </Button>
  );
}
