import "./globals.css";
import { Toaster } from "sonner";
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
        <Toaster position="top-right" richColors closeButton duration={3000} />
      </body>
    </html>
  );
}
