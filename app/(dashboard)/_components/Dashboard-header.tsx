"use client";

import { LayoutDashboard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { IUser } from "@/lib/types/auth";
import { logoutAction } from "@/app/(auth)/_actions/auth.actions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  user: IUser;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter();

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      {/* Left */}
      <SidebarTrigger />

      {/* Right */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button">
            <Avatar className="h-10 w-10 cursor-pointer">
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-60">
          <div className="border-b px-3 py-2">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <DropdownMenuItem onClick={() => router.push("/")}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Home
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => logoutAction()}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
