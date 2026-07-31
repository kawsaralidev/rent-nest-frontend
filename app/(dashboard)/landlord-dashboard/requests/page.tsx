import RequestCard from "@/components/landlord/request-card";
import { getLandlordRequests } from "@/services/rental/get-landlord-requests";

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
        <div className="flex h-60 items-center justify-center rounded-xl border">
          <p className="text-muted-foreground">No rental requests found.</p>
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
