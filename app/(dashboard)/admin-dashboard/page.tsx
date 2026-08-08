import {
  Building2,
  CheckCircle2,
  Clock3,
  Home,
  Users,
  XCircle,
} from "lucide-react";

import { getUsers } from "@/services/admin/get-users";
import { getAdminProperties } from "@/services/admin/get-properties";
import { getRentals } from "@/services/admin/get-rentals";

import DashboardCard from "@/components/admin/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboardPage = async () => {
  const [usersRes, propertiesRes, rentalsRes] = await Promise.all([
    getUsers(),
    getAdminProperties(),
    getRentals(),
  ]);

  const users = usersRes?.data ?? [];
  const properties = propertiesRes?.data ?? [];
  const rentals = rentalsRes?.data ?? [];

  /* =========================
      USER ANALYTICS
  ========================== */

  const totalUsers = users.length;

  const totalTenants = users.filter((user) => user.role === "TENANT").length;

  const totalLandlords = users.filter(
    (user) => user.role === "LANDLORD",
  ).length;

  const totalAdmins = users.filter((user) => user.role === "ADMIN").length;

  /* =========================
      PROPERTY ANALYTICS
  ========================== */

  const totalProperties = properties.length;

  const availableProperties = properties.filter(
    (property) => property.availability === true,
  ).length;

  const unavailableProperties = properties.filter(
    (property) => property.availability === false,
  ).length;

  /* =========================
      RENTAL ANALYTICS
  ========================== */

  const totalRentals = rentals.length;

  const pendingRequests = rentals.filter(
    (rental) => rental.status === "PENDING",
  ).length;

  const approvedRequests = rentals.filter(
    (rental) => rental.status === "APPROVED",
  ).length;

  const activeRentals = rentals.filter(
    (rental) => rental.status === "ACTIVE",
  ).length;

  const completedRentals = rentals.filter(
    (rental) => rental.status === "COMPLETED",
  ).length;

  const rejectedRequests = rentals.filter(
    (rental) => rental.status === "REJECTED",
  ).length;

  return (
    <div className="space-y-8 w-full">
      {/* =========================
          HEADER
      ========================== */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Administration
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Global overview of your rental platform.
        </p>
      </div>

      {/* =========================
          MAIN STATISTICS
      ========================== */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardCard
          title="Total Users"
          value={totalUsers}
          description="All registered users"
        />

        <DashboardCard
          title="Total Properties"
          value={totalProperties}
          description="Properties listed"
        />

        <DashboardCard
          title="Pending Requests"
          value={pendingRequests}
          description="Waiting for landlord action"
        />

        <DashboardCard
          title="Active Rentals"
          value={activeRentals}
          description="Currently active"
        />

        <DashboardCard
          title="Completed Rentals"
          value={completedRentals}
          description="Successfully completed"
        />

        <DashboardCard
          title="Rejected Requests"
          value={rejectedRequests}
          description="Rejected rental requests"
        />
      </div>

      {/* =========================
          USER ANALYTICS
      ========================== */}
      <Card className="rounded-2xl border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="h-5 w-5 text-primary" />
            User Overview
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <AnalyticsItem
              icon={<Users className="h-5 w-5" />}
              label="Tenants"
              value={totalTenants}
              total={totalUsers}
            />

            <AnalyticsItem
              icon={<Building2 className="h-5 w-5" />}
              label="Landlords"
              value={totalLandlords}
              total={totalUsers}
            />

            <AnalyticsItem
              icon={<Users className="h-5 w-5" />}
              label="Admins"
              value={totalAdmins}
              total={totalUsers}
            />
          </div>
        </CardContent>
      </Card>

      {/* =========================
          PROPERTY ANALYTICS
      ========================== */}
      <Card className="rounded-2xl border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Home className="h-5 w-5 text-primary" />
            Property Overview
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <AnalyticsItem
              icon={<CheckCircle2 className="h-5 w-5" />}
              label="Available Properties"
              value={availableProperties}
              total={totalProperties}
            />

            <AnalyticsItem
              icon={<XCircle className="h-5 w-5" />}
              label="Unavailable Properties"
              value={unavailableProperties}
              total={totalProperties}
            />
          </div>
        </CardContent>
      </Card>

      {/* =========================
          RENTAL STATUS
      ========================== */}
      <Card className="rounded-2xl border-border bg-card shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Building2 className="h-5 w-5 text-primary" />
            Rental Request Overview
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatusItem
              label="Pending"
              value={pendingRequests}
              total={totalRentals}
              icon={<Clock3 className="h-4 w-4" />}
              type="warning"
            />

            <StatusItem
              label="Approved"
              value={approvedRequests}
              total={totalRentals}
              icon={<CheckCircle2 className="h-4 w-4" />}
              type="info"
            />

            <StatusItem
              label="Active"
              value={activeRentals}
              total={totalRentals}
              icon={<Home className="h-4 w-4" />}
              type="success"
            />

            <StatusItem
              label="Completed"
              value={completedRentals}
              total={totalRentals}
              icon={<CheckCircle2 className="h-4 w-4" />}
              type="neutral"
            />

            <StatusItem
              label="Rejected"
              value={rejectedRequests}
              total={totalRentals}
              icon={<XCircle className="h-4 w-4" />}
              type="danger"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardPage;

/* ========================================================================== */
/* ANALYTICS ITEM                                                             */
/* ========================================================================== */

function AnalyticsItem({
  icon,
  label,
  value,
  total,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  total: number;
}) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2 text-muted-foreground ">
          {icon}

          <span className="text-sm font-medium">{label}</span>
        </div>

        <span className="text-2xl font-bold text-foreground">{value}</span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {percentage}% of total
      </p>
    </div>
  );
}

/* ========================================================================== */
/* STATUS ITEM                                                                */
/* ========================================================================== */

function StatusItem({
  label,
  value,
  total,
  icon,
  type,
}: {
  label: string;
  value: number;
  total: number;
  icon: React.ReactNode;
  type: "warning" | "info" | "success" | "neutral" | "danger";
}) {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  const styles = {
    warning: {
      wrapper: "border-yellow-500/30 bg-yellow-500/5",
      icon: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
      bar: "bg-yellow-500",
    },

    info: {
      wrapper: "border-blue-500/30 bg-blue-500/5",
      icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      bar: "bg-blue-500",
    },

    success: {
      wrapper: "border-green-500/30 bg-green-500/5",
      icon: "bg-green-500/10 text-green-600 dark:text-green-400",
      bar: "bg-green-500",
    },

    neutral: {
      wrapper: "border-border bg-muted/20",
      icon: "bg-muted text-muted-foreground",
      bar: "bg-muted-foreground",
    },

    danger: {
      wrapper: "border-red-500/30 bg-red-500/5",
      icon: "bg-red-500/10 text-red-600 dark:text-red-400",
      bar: "bg-red-500",
    },
  };

  const currentStyle = styles[type];

  return (
    <div className={`rounded-2xl border p-4 ${currentStyle.wrapper}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${currentStyle.icon}`}
          >
            {icon}
          </div>

          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>

        <span className="text-xl font-bold text-foreground">{value}</span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full ${currentStyle.bar}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        {percentage}% of rentals
      </p>
    </div>
  );
}
