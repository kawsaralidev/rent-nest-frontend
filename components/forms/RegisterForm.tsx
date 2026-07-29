"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { registerAction } from "@/app/(auth)/_actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState = {
  success: false,
  statusCode: 0,
  message: "",
};

export default function RegisterForm() {
  const router = useRouter();

  const [state, action, pending] = useActionState(registerAction, initialState);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message);
      router.push("/login");
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="mx-auto w-full max-w-md py-10">
      <Card className="">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={action} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                className="w-full"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                className="w-full"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                className="w-full"
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <Label htmlFor="role">Role</Label>

              <select
                id="role"
                name="role"
                className="w-full rounded-md border px-3 py-2"
                defaultValue="TENANT"
              >
                <option value="TENANT">Tenant</option>
                <option value="LANDLORD">Landlord</option>
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Creating..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
