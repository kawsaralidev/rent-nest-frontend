import { Badge } from "@/components/ui/badge";
import { IAdminRental } from "@/lib/types/admin";

interface RentalTableProps {
  rentals: IAdminRental[];
}

const RentalTable = ({ rentals }: RentalTableProps) => {
  if (rentals.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center">
        <p className="text-muted-foreground">No rental requests found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="px-5 py-3 text-left">Tenant</th>
            <th className="px-5 py-3 text-left">Landlord</th>
            <th className="px-5 py-3 text-left">Property</th>
            <th className="px-5 py-3 text-left">Price</th>
            <th className="px-5 py-3 text-left">Rental Status</th>
            <th className="px-5 py-3 text-left">Payment</th>
            <th className="px-5 py-3 text-center">Review</th>
            <th className="px-5 py-3 text-left">Created</th>
          </tr>
        </thead>

        <tbody>
          {rentals.map((rental) => (
            <tr
              key={rental.id}
              className="border-b transition-colors hover:bg-muted/30"
            >
              <td className="px-5 py-4">
                <div>
                  <p className="font-medium">{rental.tenant.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {rental.tenant.email}
                  </p>
                </div>
              </td>

              <td className="px-5 py-4">
                <div>
                  <p className="font-medium">{rental.property.landlord.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {rental.property.landlord.email}
                  </p>
                </div>
              </td>

              <td className="px-5 py-4">
                <div>
                  <p className="font-medium">{rental.property.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {rental.property.location}
                  </p>
                </div>
              </td>

              <td className="px-5 py-4">
                ৳ {Number(rental.property.price).toLocaleString()}
              </td>

              <td className="px-5 py-4">
                <Badge
                  variant={
                    rental.status === "COMPLETED"
                      ? "default"
                      : rental.status === "REJECTED"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {rental.status}
                </Badge>
              </td>

              <td className="px-5 py-4">
                {rental.payment ? (
                  <Badge
                    variant={
                      rental.payment.status === "COMPLETED"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {rental.payment.status}
                  </Badge>
                ) : (
                  <Badge variant="outline">N/A</Badge>
                )}
              </td>

              <td className="px-5 py-4 text-center">
                {rental.review ? <span>⭐ {rental.review.rating}/5</span> : "-"}
              </td>

              <td className="px-5 py-4">
                {new Date(rental.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalTable;
