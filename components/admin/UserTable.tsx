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
    <div className="space-y-5">
      {/* =========================
          SEARCH HEADER
      ========================== */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search by name, email or role..."
          className="w-full bg-background md:max-w-md"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <p className="text-sm text-muted-foreground">
          Total Users:{" "}
          <span className="font-semibold text-foreground">
            {filteredUsers.length}
          </span>
        </p>
      </div>

      {/* =========================
          EMPTY STATE
      ========================== */}
      {filteredUsers.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-sm">
          <p className="text-muted-foreground">No users found.</p>
        </div>
      ) : (
        <>
          {/* =========================
              TABLE
          ========================== */}
          <div className="w-full overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="min-w-full">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Created
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-border last:border-b-0 transition-colors hover:bg-accent/40"
                  >
                    {/* Name */}
                    <td className="px-6 py-4 font-medium text-foreground">
                      {user.name}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className="border-border">
                        {user.role}
                      </Badge>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          user.status === "ACTIVE" ? "default" : "destructive"
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>

                    {/* Created */}
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-center">
                      {user.status === "ACTIVE" ? (
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={isPending}
                          onClick={() => handleStatusUpdate(user.id, "BANNED")}
                        >
                          {isPending ? "Updating..." : "Ban"}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled={isPending}
                          onClick={() => handleStatusUpdate(user.id, "ACTIVE")}
                        >
                          {isPending ? "Updating..." : "Unban"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =========================
              PAGINATION
          ========================== */}
          <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-4 shadow-sm md:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              -
              <span className="font-semibold text-foreground">
                {" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {filteredUsers.length}
              </span>{" "}
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

              <span className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground">
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
