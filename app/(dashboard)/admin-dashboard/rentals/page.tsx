import { getRentals } from "@/services/admin/get-rentals";
import RentalTable from "./_components/RentalTable";

export default async function AdminRentalsPage() {
  const response = await getRentals();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rental Requests</h1>
        <p className="text-muted-foreground">
          Manage all rental requests across the platform.
        </p>
      </div>

      <RentalTable rentals={response.data} />
    </div>
  );
}
