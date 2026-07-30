"use client";

import { IUser } from "@/lib/types/auth";

interface AppSidebarProps {
  user: IUser;
}

export function AppSidebar({ user }: AppSidebarProps) {
  return <div>{user.name}</div>;
}
