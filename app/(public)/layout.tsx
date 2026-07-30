import { ReactNode } from "react";

import Navbar from "@/components/shared/navbar";
import { getMe } from "@/services/getme";

interface PublicLayoutProps {
  children: ReactNode;
}

export default async function PublicLayout({ children }: PublicLayoutProps) {
  const user = await getMe();

  return (
    <>
      <Navbar user={user} />

      <main>{children}</main>
    </>
  );
}
