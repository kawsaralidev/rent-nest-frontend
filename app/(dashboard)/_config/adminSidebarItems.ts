import { Home, Users, Building2, FolderTree, Receipt } from "lucide-react";

export const adminSidebarItems = [
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
    title: "Categories",
    url: "/admin-dashboard/categories",
    icon: FolderTree,
  },
  {
    title: "Properties",
    url: "/admin-dashboard/properties",
    icon: Building2,
  },
  {
    title: "Rentals",
    url: "/admin-dashboard/rentals",
    icon: Receipt,
  },
];
