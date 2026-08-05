"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Home, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-100">
      {/* Background Blur */}
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />

      <div className="container -mt-15 mx-auto px-6 py-24 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow">
              <Home className="h-4 w-4 text-blue-600" />
              Trusted Rental Platform
            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight text-gray-900 lg:text-6xl">
              Find Your
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Dream Home
              </span>
              Without The Stress
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Discover verified rental properties, connect with trusted
              landlords, request rentals instantly and complete secure online
              payments—all from one modern platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-xl px-8 shadow-lg transition hover:scale-105"
                asChild
              >
                <Link href="/properties">
                  Explore Properties
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-xl border-2 px-8 transition hover:bg-blue-50"
                asChild
              >
                <Link href="/register">Become a Landlord</Link>
              </Button>
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <p className="text-gray-700">Verified Property Listings</p>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <p className="text-gray-700">
                  Secure Stripe Payment Integration
                </p>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <p className="text-gray-700">Trusted by Hundreds of Tenants</p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border bg-white p-3 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Home"
                className="h-[620px] w-full rounded-2xl object-cover"
              />
            </div>

            <div className="absolute -left-8 top-10 rounded-2xl bg-white p-5 shadow-xl">
              <p className="text-sm text-gray-500">Available</p>
              <h3 className="mt-1 text-2xl font-bold text-blue-600">520+</h3>
              <p className="text-sm text-gray-500">Properties</p>
            </div>

            <div className="absolute -right-8 bottom-12 rounded-2xl bg-white p-5 shadow-xl">
              <p className="text-sm text-gray-500">Happy Tenants</p>
              <h3 className="mt-1 text-2xl font-bold text-emerald-600">
                1,500+
              </h3>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-6 rounded-3xl border bg-white/80 p-8 shadow-xl backdrop-blur md:grid-cols-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-600">500+</h2>
            <p className="mt-2 text-gray-600">Verified Properties</p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-600">120+</h2>
            <p className="mt-2 text-gray-600">Professional Landlords</p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-600">1500+</h2>
            <p className="mt-2 text-gray-600">Happy Tenants</p>
          </div>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-600">24/7</h2>
            <p className="mt-2 text-gray-600">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
