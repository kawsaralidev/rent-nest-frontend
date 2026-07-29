import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { getMe } from "@/services/getme";
import Navbar from "@/components/shared/navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();

  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Navbar user={user} />

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
