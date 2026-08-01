"use client";

import { IUser } from "@/lib/types/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserTableProps {
  users: IUser[];
}

const UserTable = ({ users }: UserTableProps) => {
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
            <tr key={user.id} className="border-b last:border-none">
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
                  <Button size="sm" variant="destructive">
                    Ban
                  </Button>
                ) : (
                  <Button size="sm">Unban</Button>
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
