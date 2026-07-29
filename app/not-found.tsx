import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-6xl font-bold">404</h1>

      <p>Page Not Found</p>

      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
