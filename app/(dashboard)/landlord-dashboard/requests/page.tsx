import RequestCard from "@/components/landlord/request-card";
import { getLandlordRequests } from "@/services/rental/get-landlord-requests";
import { ClipboardList } from "lucide-react";

const LandlordRequestsPage = async () => {
  const rentals = await getLandlordRequests();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Rental Requests</h1>
        <p className="text-muted-foreground">
          Manage all incoming rental requests.
        </p>
      </div>

      {rentals.length === 0 ? (
        <div className="flex h-80 flex-col items-center justify-center rounded-xl border border-dashed">
          <ClipboardList className="mb-4 h-14 w-14 text-muted-foreground" />

          <h2 className="text-xl font-semibold">No Rental Requests</h2>

          <p className="text-muted-foreground">
            There are currently no incoming rental requests.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rentals.map((rental) => (
            <RequestCard key={rental.id} rental={rental} />
          ))}
        </div>
      )}
    </section>
  );
};

export default LandlordRequestsPage;
