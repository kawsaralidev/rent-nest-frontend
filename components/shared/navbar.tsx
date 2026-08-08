"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { LayoutDashboard, LogOut, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import ThemeToggle from "./ThemeToggle";

import { IUser } from "@/lib/types/auth";
import { logoutAction } from "@/app/(auth)/_actions/auth.actions";
import { cn } from "@/lib/utils";

interface NavbarProps {
  user: IUser | null;
}

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Properties",
    href: "/properties",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDashboard = () => {
    switch (user?.role) {
      case "ADMIN":
        router.push("/admin-dashboard");
        break;

      case "LANDLORD":
        router.push("/landlord-dashboard");
        break;

      default:
        router.push("/tenant-dashboard");
    }
  };
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border/60 bg-background/80 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-background/60 backdrop-blur-lg",
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight">RentNest</h2>

            <p className="-mt-1 text-xs text-muted-foreground">
              Smart Rental Platform
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                  active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />

          {!user ? (
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>

              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="outline-none">
                  <Avatar className="h-11 w-11 cursor-pointer border-2 border-primary/20 transition hover:border-primary">
                    <AvatarFallback className="bg-primary text-sm font-bold text-primary-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-72 rounded-2xl border-border p-2 shadow-xl"
              >
                <div className="border-b border-border px-3 py-3">
                  <h3 className="font-semibold">{user.name}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>

                <DropdownMenuItem
                  onClick={handleDashboard}
                  className="mt-2 cursor-pointer rounded-xl py-3"
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  className="cursor-pointer rounded-xl py-3"
                >
                  <Avatar className="mr-3 h-5 w-5">
                    <AvatarFallback className="text-[10px]">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => logoutAction()}
                  className="cursor-pointer rounded-xl py-3 text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[320px] border-r border-border"
            >
              <div className="mt-8">
                <Link href="/" className="flex items-center gap-3">
                  <div>
                    <h2 className="text-xl font-bold">RentNest</h2>

                    <p className="text-xs text-muted-foreground">
                      Smart Rental Platform
                    </p>
                  </div>
                </Link>

                <div className="mt-10 flex flex-col gap-2">
                  {navItems.map((item) => {
                    const active =
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "rounded-xl px-4 py-3 font-medium transition-all",
                          active
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent",
                        )}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <ThemeToggle />
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  {!user ? (
                    <>
                      <Link href="/login">
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>

                      <Link href="/register">
                        <Button className="w-full">Register</Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={handleDashboard}
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => router.push("/profile")}
                      >
                        <Avatar className="mr-2 h-5 w-5">
                          <AvatarFallback className="text-[10px]">
                            {user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        Profile
                      </Button>

                      <Button
                        variant="destructive"
                        className="w-full justify-start"
                        onClick={() => logoutAction()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
