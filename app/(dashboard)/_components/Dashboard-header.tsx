import { SidebarTrigger } from "@/components/ui/sidebar";

import { IUser } from "@/lib/types/auth";

interface DashboardHeaderProps {
  user: IUser;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="text-right">
        <p className="text-sm font-medium">{user.name}</p>

        <p className="text-xs text-muted-foreground">{user.role}</p>
      </div>
    </header>
  );
}
