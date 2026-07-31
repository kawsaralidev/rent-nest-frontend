"use client";

import Link from "next/link";

import { IUser } from "@/lib/types/auth";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";

import { adminSidebarItems } from "../_config/adminSidebarItems";
import { landlordSidebarItems } from "../_config/landlordSidebarItems";
import { tenantSidebarItems } from "../_config/tenantSidebarItems";

interface AppSidebarProps {
  user: IUser;
}

export function AppSidebar({ user }: AppSidebarProps) {
  const items =
    user.role === "ADMIN"
      ? adminSidebarItems
      : user.role === "LANDLORD"
        ? landlordSidebarItems
        : tenantSidebarItems;

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-3 rounded-lg p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
            RN
          </div>

          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate font-semibold">RentNest</span>

            <span className="truncate text-xs text-muted-foreground">
              Rental Platform
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
