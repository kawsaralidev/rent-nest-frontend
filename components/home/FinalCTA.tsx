import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ShieldCheck,
  BadgeCheck,
  Home,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "500+ Verified Properties",
    description: "Find apartments, houses, villas and commercial spaces.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure Stripe Payments",
    description: "Safe and trusted online payment experience.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: BadgeCheck,
    title: "Trusted By Thousands",
    description: "A modern rental platform built for tenants and landlords.",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
];

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100" />

      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-200/30 blur-3xl" />

      <div className="absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="container relative mx-auto px-6">
        <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-white p-10 shadow-[0_25px_80px_rgba(15,23,42,0.08)] lg:p-16">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left */}

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-5 py-3 font-semibold text-blue-700">
                <Home className="h-5 w-5" />
                Find Your Perfect Home
              </div>

              <h2 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900 lg:text-5xl">
                Ready To Start
                <br />
                Your Rental
                <br />
                <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent">
                  Journey?
                </span>
              </h2>

              <p className="mt-8 max-w-xl text-lg leading-9 text-slate-600">
                Browse hundreds of verified rental properties, connect with
                trusted landlords, submit requests instantly and pay securely
                through Stripe.
              </p>

              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-3 rounded-2xl bg-blue-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-blue-800 hover:shadow-xl"
                >
                  Explore Properties
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/register"
                  className="rounded-2xl border border-blue-200 bg-white px-8 py-4 text-lg font-semibold text-blue-700 transition-all duration-300 hover:bg-slate-50"
                >
                  Join RentNest
                </Link>
              </div>
            </div>
            {/* Right */}

            <div className="space-y-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="group flex items-center justify-between rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-center gap-5">
                      <div
                        className={`flex h-24 w-25 items-center justify-center rounded-full ${feature.iconBg}`}
                      >
                        <Icon className={`h-11 w-11 ${feature.iconColor}`} />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          {feature.title}
                        </h3>

                        <p className="mt-3 max-w-md text-md leading-8 text-slate-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:bg-blue-100">
                      <ChevronRight className="h-6 w-6 text-slate-500 group-hover:text-blue-600" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
