"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { updateUserStatusAction } from "@/app/(dashboard)/admin-dashboard/users/_actions/update-user-status";

import { IUser } from "@/lib/types/admin";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserTableProps {
  users: IUser[];
}

const ITEMS_PER_PAGE = 10;

const UserTable = ({ users }: UserTableProps) => {
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase();

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.role.toLowerCase().includes(keyword),
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleStatusUpdate = (id: string, status: "ACTIVE" | "BANNED") => {
    startTransition(async () => {
      const result = await updateUserStatusAction(id, status);

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search by name, email or role..."
          className="w-full md:max-w-md"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <p className="text-sm text-muted-foreground">
          Total Users:{" "}
          <span className="font-semibold">{filteredUsers.length}</span>
        </p>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="rounded-xl border p-10 text-center">
          <p className="text-muted-foreground">No users found.</p>
        </div>
      ) : (
        <>
          <div className="w-full overflow-x-auto rounded-xl border bg-white shadow-sm">
            <table className="min-w-full">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Role</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Created</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-muted/30">
                    <td className="px-6 py-4 font-medium">{user.name}</td>

                    <td className="px-6 py-4">{user.email}</td>

                    <td className="px-6 py-4">
                      <Badge variant="secondary">{user.role}</Badge>
                    </td>

                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          user.status === "ACTIVE" ? "default" : "destructive"
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>

                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-center">
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
          <div className="flex flex-col items-center justify-between gap-4 border-t bg-muted/20 px-6 py-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              -
              <span className="font-semibold">
                {" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)}
              </span>{" "}
              of <span className="font-semibold">{filteredUsers.length}</span>{" "}
              users
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>

              <span className="rounded-md border px-4 py-2 text-sm font-medium">
                {currentPage} / {Math.max(totalPages, 1)}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserTable;
