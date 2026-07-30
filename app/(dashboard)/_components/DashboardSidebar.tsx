"use client";

import { IUser } from "@/lib/types/auth";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import SidebarLogo from "./SidebarLogo";
import NavUser from "./NavUser";
import { adminSidebarItems } from "../_config/adminSidebarItems";
import { landlordSidebarItems } from "../_config/landlordSidebarItems";
import { tenantSidebarItems } from "../_config/tenantSidebarItems";
import NavMain from "./NavMain";

interface DashboardSidebarProps {
  user: IUser;
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const items =
    user.role === "ADMIN"
      ? adminSidebarItems
      : user.role === "LANDLORD"
        ? landlordSidebarItems
        : tenantSidebarItems;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
