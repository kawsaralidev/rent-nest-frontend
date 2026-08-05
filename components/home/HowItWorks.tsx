import Link from "next/link";
import {
  Search,
  Send,
  BadgeCheck,
  CreditCard,
  Home,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Search Property",
    description:
      "Browse verified rental properties using smart search and filters to find the perfect home.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "02",
    title: "Send Rental Request",
    description:
      "Choose your preferred property and send a rental request directly to the landlord.",
    icon: Send,
    color: "from-emerald-500 to-green-500",
  },
  {
    id: "03",
    title: "Get Approved",
    description:
      "The landlord reviews your request and approves it after verification.",
    icon: BadgeCheck,
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "04",
    title: "Secure Payment",
    description:
      "Complete your payment securely through Stripe after approval.",
    icon: CreditCard,
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "05",
    title: "Move Into Your Home",
    description:
      "Receive confirmation and enjoy your new rental home without hassle.",
    icon: Home,
    color: "from-pink-500 to-rose-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-slate-50 to-white" />

      <div className="absolute left-0 top-20 -z-10 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-50" />
      <div className="absolute right-0 bottom-0 -z-10 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-50" />

      <div className="container mx-auto px-6">
        {/* Heading */}

        <div className="mx-auto mb-20 max-w-3xl text-center">
          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-600">
            Simple Process
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 lg:text-5xl">
            How RentNest Works
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Renting your next home has never been easier. Complete everything in
            just a few simple steps.
          </p>
        </div>

        {/* Timeline */}

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute left-8 top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-blue-500 to-cyan-400 lg:block" />

          <div className="space-y-10">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className="group relative flex flex-col gap-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl lg:flex-row lg:items-center"
                >
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r ${step.color} text-white shadow-lg transition duration-300 group-hover:scale-110`}
                  >
                    <Icon size={30} />
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 text-sm font-bold tracking-widest text-blue-600">
                      STEP {step.id}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>

                  <ArrowRight className="hidden text-slate-400 lg:block" />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
      </div>
    </section>
  );
};

export default HowItWorks;
