import { getUsers } from "@/services/admin/get-users";
import { getAdminProperties } from "@/services/admin/get-properties";
import { getRentals } from "@/services/admin/get-rentals";

import DashboardCard from "@/components/admin/DashboardCard";

const AdminDashboardPage = async () => {
  const [usersRes, propertiesRes, rentalsRes] = await Promise.all([
    getUsers(),
    getAdminProperties(),
    getRentals(),
  ]);

  const totalUsers = usersRes.data.length;
  const totalProperties = propertiesRes.data.length;

  const pendingRequests = rentalsRes.data.filter(
    (rental) => rental.status === "PENDING",
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="text-muted-foreground">
          Global overview of platform health.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <DashboardCard title="Total Users" value={totalUsers} />

        <DashboardCard title="Total Properties" value={totalProperties} />

        <DashboardCard title="Pending Requests" value={pendingRequests} />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
