import Image from "next/image";

import RequestRentalButton from "@/components/property/rental-request-button";
import { getSingleProperty } from "@/services/property/get-single-property";
import { getMe } from "@/services/getme";

const PropertyDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const response = await getSingleProperty(id);
  const property = response.data;
  const user = await getMe();

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 py-10">
        {/* Hero Image */}
        <div className="relative h-[420px] overflow-hidden rounded-3xl">
          <Image
            src={
              property.imageUrl ||
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1600&auto=format&fit=crop"
            }
            alt={property.title}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl font-bold text-white">{property.title}</h1>

            <p className="mt-3 text-lg text-white/90">📍 {property.location}</p>
          </div>

          <div className="absolute right-8 top-8">
            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                property.availability
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {property.availability ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="mb-5 text-2xl font-bold">Description</h2>

              <p className="leading-8 text-gray-600">{property.description}</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Amenities</h2>

              <div className="flex flex-wrap gap-3">
                {property.amenities.map((item: string) => (
                  <span
                    key={item}
                    className="rounded-full bg-primary/10 px-5 py-2 text-sm font-medium text-primary"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="text-4xl font-extrabold text-primary">
                ৳ {Number(property.price).toLocaleString()}
              </h2>

              <p className="mb-8 text-gray-500">Per Month</p>

              <div className="space-y-5">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Category</span>

                  <span className="font-semibold">
                    {property.category.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Landlord</span>

                  <span className="font-semibold">
                    {property.landlord.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium text-gray-500">Email</span>

                  <span className="text-sm">{property.landlord.email}</span>
                </div>

                <div className="flex justify-between pb-5">
                  <span className="font-medium text-gray-500">Status</span>

                  <span
                    className={
                      property.availability
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-600"
                    }
                  >
                    {property.availability ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              <RequestRentalButton
                propertyId={property.id}
                availability={property.availability}
                isLoggedIn={!!user}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailsPage;
