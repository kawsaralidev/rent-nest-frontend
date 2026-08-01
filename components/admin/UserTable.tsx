"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { updateUserStatusAction } from "@/app/(dashboard)/admin-dashboard/users/_actions/update-user-status";

import { IUser } from "@/lib/types/admin";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserTableProps {
  users: IUser[];
}

const UserTable = ({ users }: UserTableProps) => {
  const [isPending, startTransition] = useTransition();

  const handleStatusUpdate = (id: string, status: "ACTIVE" | "BANNED") => {
    startTransition(async () => {
      const res = await updateUserStatusAction(id, status);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  if (users.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center">
        <p className="text-muted-foreground">No users found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="px-5 py-3 text-left">Name</th>
            <th className="px-5 py-3 text-left">Email</th>
            <th className="px-5 py-3 text-left">Role</th>
            <th className="px-5 py-3 text-left">Status</th>
            <th className="px-5 py-3 text-left">Created</th>
            <th className="px-5 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b transition-colors hover:bg-muted/30"
            >
              <td className="px-5 py-4 font-medium">{user.name}</td>

              <td className="px-5 py-4">{user.email}</td>

              <td className="px-5 py-4">
                <Badge variant="secondary">{user.role}</Badge>
              </td>

              <td className="px-5 py-4">
                <Badge
                  variant={user.status === "ACTIVE" ? "default" : "destructive"}
                >
                  {user.status}
                </Badge>
              </td>

              <td className="px-5 py-4">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>

              <td className="px-5 py-4 text-center">
                {user.status === "ACTIVE" ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isPending}
                    onClick={() => handleStatusUpdate(user.id, "BANNED")}
                  >
                    Ban
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleStatusUpdate(user.id, "ACTIVE")}
                  >
                    Unban
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
