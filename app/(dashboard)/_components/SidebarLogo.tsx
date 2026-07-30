import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function SidebarLogo() {
  return (
    <div className="flex items-center justify-between px-2">
      <Link href="/" className="text-xl font-bold tracking-tight">
        RentNest
      </Link>

      <SidebarTrigger />
    </div>
  );
}
