"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { IUser } from "@/lib/types/auth";
import { useRouter } from "next/navigation";
import { User, LayoutDashboard, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { logoutAction } from "@/app/(auth)/_actions/auth.actions";

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
  const router = useRouter();

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
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          RentNest
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right Side (Temporary) */}
        <div className="hidden md:flex items-center gap-2">
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
                <button>
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-60">
                <div className="border-b px-3 py-2">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>

                <DropdownMenuItem onClick={handleDashboard}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => logoutAction()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <div className="mt-8 flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium"
                  >
                    {item.title}
                  </Link>
                ))}

                <div className="mt-6 flex flex-col gap-3">
                  {!user ? (
                    <>
                      <Link href="/login">
                        <Button className="w-full" variant="outline">
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
                        className="w-full"
                        variant="outline"
                        onClick={handleDashboard}
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>

                      <Button
                        className="w-full"
                        variant="destructive"
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
