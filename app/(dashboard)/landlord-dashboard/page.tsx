import { Building2, Clock3, Banknote } from "lucide-react";

import { getMyProperties } from "@/services/property/get-my-properties";
import { getLandlordRequests } from "@/services/rental/get-landlord-requests";

const LandlordDashboardPage = async () => {
  const [propertyResponse, requests] = await Promise.all([
    getMyProperties(),
    getLandlordRequests(),
  ]);

  const properties = propertyResponse.data;

  const totalProperties = properties.length;

  const activeRequests = requests.filter(
    (request) => request.status === "PENDING" || request.status === "APPROVED",
  ).length;

  const totalEarnings = requests
    .filter(
      (request) =>
        request.payment && request.payment.status.toUpperCase() === "COMPLETED",
    )
    .reduce((total, request) => {
      return total + Number(request.payment?.amount ?? 0);
    }, 0);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Landlord Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <DashboardCard
          title="Total Properties"
          value={totalProperties}
          icon={<Building2 className="h-7 w-7" />}
        />

        <DashboardCard
          title="Active Requests"
          value={activeRequests}
          icon={<Clock3 className="h-7 w-7" />}
        />

        <DashboardCard
          title="Total Earnings"
          value={`৳ ${totalEarnings.toLocaleString()}`}
          icon={<Banknote className="h-7 w-7" />}
        />
      </div>
    </div>
  );
};

export default LandlordDashboardPage;

function DashboardCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>
        </div>

        <div className="rounded-xl bg-primary/10 p-4 text-primary">{icon}</div>
      </div>
    </div>
  );
}
