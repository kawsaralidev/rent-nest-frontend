import { CreditCard, Home, Receipt } from "lucide-react";

export const tenantSidebarItems = [
  {
    title: "Dashboard",
    url: "/tenant-dashboard",
    icon: Home,
  },
  {
    title: "My Rentals",
    url: "/tenant-dashboard/rentals",
    icon: Receipt,
  },
  {
    title: "Payments",
    url: "/tenant-dashboard/payment-history",
    icon: CreditCard,
  },
];
