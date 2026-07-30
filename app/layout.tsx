import { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { getMe } from "@/services/getme";

// import DashboardSidebar from "./_components/DashboardSidebar";
// import DashboardHeader from "./_components/DashboardHeader";
import { AppSidebar } from "./(dashboard)/_components/App-sidebar";
import DashboardHeader from "./(dashboard)/_components/Dashboard-header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getMe();

  return (
    <SidebarProvider>
      <AppSidebar user={user} />

      <SidebarInset>
        <DashboardHeader user={user} />

        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
