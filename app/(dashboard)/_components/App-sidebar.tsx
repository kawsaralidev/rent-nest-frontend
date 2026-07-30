"use client";

import Link from "next/link";
import { Home, Building2, Users, ReceiptText } from "lucide-react";

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

interface AppSidebarProps {
  user: IUser;
}

export function AppSidebar({ user }: AppSidebarProps) {
  const adminItems = [
    {
      title: "Dashboard",
      url: "/admin-dashboard",
      icon: Home,
    },
    {
      title: "Users",
      url: "/admin-dashboard/users",
      icon: Users,
    },
    {
      title: "Properties",
      url: "/admin-dashboard/properties",
      icon: Building2,
    },
    {
      title: "Payments",
      url: "/admin-dashboard/payments",
      icon: ReceiptText,
    },
  ];

  const landlordItems = [
    {
      title: "Dashboard",
      url: "/landlord-dashboard",
      icon: Home,
    },
    {
      title: "My Properties",
      url: "/landlord-dashboard/properties",
      icon: Building2,
    },
    {
      title: "Rent Requests",
      url: "/landlord-dashboard/rent-requests",
      icon: ReceiptText,
    },
  ];

  const tenantItems = [
    {
      title: "Dashboard",
      url: "/tenant-dashboard",
      icon: Home,
    },
    {
      title: "My Rentals",
      url: "/tenant-dashboard/rentals",
      icon: Building2,
    },
    {
      title: "Payment History",
      url: "/tenant-dashboard/payments",
      icon: ReceiptText,
    },
  ];

  const items =
    user.role === "ADMIN"
      ? adminItems
      : user.role === "LANDLORD"
        ? landlordItems
        : tenantItems;

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-3 rounded-lg p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
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
