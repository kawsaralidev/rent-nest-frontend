import PayNowButton from "@/components/rentals/PayNowButton";
import { IRental } from "@/lib/types/rental";
import { getRentals } from "@/services/property/get-rentals";

const RentalsPage = async () => {
  const response = await getRentals();

  const rentals: IRental[] = response?.data ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Rentals</h1>

      {rentals.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <p className="text-muted-foreground">
            You have not requested any rentals yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {rentals.map((rental) => (
            <div key={rental.id} className="rounded-lg border p-5 shadow-sm">
              <h2 className="text-xl font-semibold">{rental.property.title}</h2>

              <p className="text-muted-foreground">
                {rental.property.location}
              </p>

              <p className="mt-2 font-medium">
                ৳ {rental.property.price}/month
              </p>

              <div className="mt-3">
                <span className="rounded bg-gray-100 px-3 py-1 text-sm">
                  {rental.status}
                </span>
              </div>
              <div className="mt-4">
                {rental.status === "APPROVED" &&
                  rental.payment?.status === "PENDING" && (
                    <PayNowButton rentalRequestId={rental.id} />
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentalsPage;
