import PayNowButton from "@/components/rentals/PayNowButton";
import ReviewButton from "@/components/rentals/ReviewButton";
import { IRental } from "@/lib/types/rental";
import { getRentals } from "@/services/property/get-rentals";

const RentalsPage = async () => {
  const response = await getRentals();

  const rentals: IRental[] = response?.data ?? [];
  console.log("Rental:", rentals);

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
                <span
                  className={`rounded px-3 py-1 text-sm font-medium ${
                    rental.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : rental.status === "APPROVED"
                        ? "bg-blue-100 text-blue-700"
                        : rental.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : rental.status === "COMPLETED"
                            ? "bg-slate-200 text-slate-700"
                            : "bg-red-100 text-red-700"
                  }`}
                >
                  {rental.status}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                {rental.status === "APPROVED" && (
                  <PayNowButton rentalRequestId={rental.id} />
                )}

                {rental.status === "COMPLETED" &&
                  (rental.review ? (
                    <span className="rounded-md bg-green-100 px-3 py-2 text-sm font-medium text-green-700">
                      Reviewed
                    </span>
                  ) : (
                    <ReviewButton rental={rental} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentalsPage;
