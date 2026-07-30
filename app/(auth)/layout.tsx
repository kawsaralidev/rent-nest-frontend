import Navbar from "@/components/shared/navbar";
import { getMe } from "@/services/getme";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  return (
    <>
      <Navbar user={user} />

      <main className="min-h-screen bg-muted/30 px-4">{children}</main>
    </>
  );
}
