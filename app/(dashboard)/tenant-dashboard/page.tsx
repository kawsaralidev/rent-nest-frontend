import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Home,
  Search,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { getRentals } from "@/services/property/get-rentals";
import { IRental } from "@/lib/types/rental";

const TenantDashboard = async () => {
  const response = await getRentals();

  const rentals: IRental[] = response?.data ?? [];

  const totalRentals = rentals.length;

  const pendingRentals = rentals.filter(
    (rental) => rental.status === "PENDING",
  ).length;

  const activeRentals = rentals.filter(
    (rental) => rental.status === "ACTIVE",
  ).length;

  const completedRentals = rentals.filter(
    (rental) => rental.status === "COMPLETED",
  ).length;

  const recentRentals = rentals.slice(0, 5);

  return (
    <div className="space-y-8 w-full">
      {/* Header */}
      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Tenant Portal
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              Tenant Dashboard
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage your rental requests and keep track of your properties.
            </p>
          </div>

          <Button asChild className="rounded-xl">
            <Link href="/properties">
              <Search className="mr-2 h-4 w-4" />
              Browse Properties
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Rentals"
          value={totalRentals}
          description="All rental requests"
          icon={<Building2 className="h-5 w-5" />}
        />

        <DashboardCard
          title="Pending Requests"
          value={pendingRentals}
          description="Waiting for approval"
          icon={<Clock3 className="h-5 w-5" />}
        />

        <DashboardCard
          title="Active Rentals"
          value={activeRentals}
          description="Currently rented"
          icon={<Home className="h-5 w-5" />}
        />

        <DashboardCard
          title="Completed"
          value={completedRentals}
          description="Completed rentals"
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
      </div>

      {/* Quick Actions */}
      <Card className="overflow-hidden rounded-2xl border-border bg-card shadow-sm">
        <CardContent className="p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Quickly access the most useful sections.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/properties"
              className="group rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-accent/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Search className="h-5 w-5" />
                </div>

                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">
                Find a Property
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Explore available rental properties.
              </p>
            </Link>

            <Link
              href="/tenant-dashboard/rentals"
              className="group rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-accent/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Building2 className="h-5 w-5" />
                </div>

                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
              </div>

              <h3 className="mt-4 font-semibold text-foreground">My Rentals</h3>

              <p className="mt-1 text-sm text-muted-foreground">
                View your rental requests and payments.
              </p>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Rentals */}
      <Card className="overflow-hidden rounded-2xl border-border bg-card shadow-sm">
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Recent Rentals
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your latest rental activity.
              </p>
            </div>

            {rentals.length > 0 && (
              <Button asChild variant="outline" className="rounded-xl">
                <Link href="/tenant-dashboard/rentals">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>

          {recentRentals.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-6 py-14 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Home className="h-7 w-7" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No Rental Activity Yet
              </h3>

              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                You have not requested any rental property yet. Start exploring
                properties and find your perfect home.
              </p>

              <Button asChild className="mt-5 rounded-xl">
                <Link href="/properties">Explore Properties</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentRentals.map((rental) => (
                <RentalRow key={rental.id} rental={rental} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantDashboard;

/* -------------------------------------------------------------------------- */
/* Dashboard Card                                                             */
/* -------------------------------------------------------------------------- */

function DashboardCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="rounded-2xl border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <h2 className="mt-2 text-3xl font-bold text-foreground">{value}</h2>

            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* Rental Row                                                                 */
/* -------------------------------------------------------------------------- */

function RentalRow({ rental }: { rental: IRental }) {
  const statusClass =
    rental.status === "PENDING"
      ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/10"
      : rental.status === "APPROVED"
        ? "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/10"
        : rental.status === "ACTIVE"
          ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/10"
          : rental.status === "COMPLETED"
            ? "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300 hover:bg-slate-500/10"
            : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/10";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:bg-accent/30 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h3 className="truncate font-semibold text-foreground">
          {rental.property.title}
        </h3>

        <p className="mt-1 truncate text-sm text-muted-foreground">
          📍 {rental.property.location}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:justify-end">
        <div>
          <p className="text-xs text-muted-foreground">Monthly Rent</p>

          <p className="font-semibold text-foreground">
            ৳ {Number(rental.property.price).toLocaleString()}
          </p>
        </div>

        <Badge className={statusClass}>{rental.status}</Badge>

        <Button asChild variant="ghost" size="sm" className="rounded-lg">
          <Link href={`/properties/${rental.property.id}`}>View</Link>
        </Button>
      </div>
    </div>
  );
}
