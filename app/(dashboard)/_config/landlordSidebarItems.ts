import { Building2, Home, PlusCircle } from "lucide-react";

export const landlordSidebarItems = [
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
    title: "Add Property",
    url: "/landlord-dashboard/properties/create",
    icon: PlusCircle,
  },
];
