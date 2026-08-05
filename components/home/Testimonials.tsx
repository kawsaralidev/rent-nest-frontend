import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Tenant",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "RentNest made finding my apartment incredibly easy. The whole process was smooth and secure.",
  },
  {
    id: 2,
    name: "Mahmud Hasan",
    role: "Landlord",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "Managing my properties has never been easier. I can approve requests and monitor everything from one dashboard.",
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Tenant",
    image: "https://i.pravatar.cc/150?img=45",
    review:
      "The Stripe payment system is fast and reliable. I highly recommend RentNest to everyone.",
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-slate-50" />

      <div className="container mx-auto px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-600">
            Testimonials
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 lg:text-5xl">
            What Our Users Say
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Trusted by tenants and landlords across the country.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-5 leading-7 text-slate-600">{item.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
