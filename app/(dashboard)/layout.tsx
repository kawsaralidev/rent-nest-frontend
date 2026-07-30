import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "./_components/App-sidebar";
import DashboardHeader from "./_components/Dashboard-header";
import { getMe } from "@/services/getme";
import { AppSidebar } from "./_components/App-sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const user = await getMe();
  return (
    <SidebarProvider>
      <AppSidebar user={user} />

      <SidebarInset>
        <DashboardHeader user={user} />

        <main className="flex flex-1 flex-col p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default DashboardLayout;
