import { ArrowLeft, Mail, ShieldCheck, User } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { getMe } from "@/services/getme";

import Footer from "@/components/shared/Footer";

const ProfilePage = async () => {
  const user = await getMe();

  /* =========================
      NOT LOGGED IN
  ========================== */

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
          <Card className="w-full max-w-lg rounded-3xl border-border bg-card shadow-lg">
            <CardContent className="flex flex-col items-center p-8 text-center sm:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-8 w-8" />
              </div>

              <h1 className="mt-6 text-2xl font-bold text-foreground">
                Please Login
              </h1>

              <p className="mt-2 max-w-md text-muted-foreground">
                You need to be logged in to view your profile.
              </p>

              <Button asChild className="mt-6 rounded-xl">
                <Link href="/login">Login</Link>
              </Button>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  /* =========================
      USER INITIALS
  ========================== */

  const initials =
    user.name
      ?.split(" ")
      .map((name: string) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  /* =========================
      DASHBOARD PATH
  ========================== */

  const dashboardPath =
    user.role === "ADMIN"
      ? "/admin-dashboard"
      : user.role === "LANDLORD"
        ? "/landlord-dashboard"
        : "/tenant-dashboard";

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* =========================
          NAVBAR
      ========================== */}

      <main className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-6">
          {/* =========================
              HEADER
          ========================== */}

          <div className="mb-8">
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Account
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 text-muted-foreground">
              View your account information and profile details.
            </p>
          </div>

          {/* =========================
              PROFILE CARD
          ========================== */}

          <Card className="overflow-hidden rounded-3xl border-border bg-card shadow-lg">
            {/* Profile Header */}
            <div className="bg-primary px-6 py-10 sm:px-10">
              <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
                {/* Avatar */}

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-primary-foreground/30 bg-primary-foreground text-2xl font-extrabold text-primary shadow-xl">
                  {initials}
                </div>

                {/* User Info */}

                <div className="text-primary-foreground">
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    {user.name}
                  </h2>

                  <p className="mt-1 text-primary-foreground/80">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Content */}

            <CardContent className="p-6 sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* =========================
                    FULL NAME
                ========================== */}

                <div className="rounded-2xl border border-border bg-muted/30 p-5 transition-colors">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <User className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </span>
                  </div>

                  <p className="text-lg font-semibold text-foreground">
                    {user.name}
                  </p>
                </div>

                {/* =========================
                    EMAIL
                ========================== */}

                <div className="rounded-2xl border border-border bg-muted/30 p-5 transition-colors">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-medium text-muted-foreground">
                      Email Address
                    </span>
                  </div>

                  <p className="break-all text-lg font-semibold text-foreground">
                    {user.email}
                  </p>
                </div>

                {/* =========================
                    ROLE
                ========================== */}

                <div className="rounded-2xl border border-border bg-muted/30 p-5 transition-colors sm:col-span-2">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <ShieldCheck className="h-5 w-5" />
                    </div>

                    <span className="text-sm font-medium text-muted-foreground">
                      Account Role
                    </span>
                  </div>

                  <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                    {user.role}
                  </span>
                </div>
              </div>

              {/* =========================
                  DASHBOARD
              ========================== */}

              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-foreground">
                    Ready to continue?
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Go back to your dashboard to manage your activities.
                  </p>
                </div>

                <Button asChild className="rounded-xl">
                  <Link href={dashboardPath}>Go to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* =========================
          FOOTER
      ========================== */}

      <Footer />
    </div>
  );
};

export default ProfilePage;
