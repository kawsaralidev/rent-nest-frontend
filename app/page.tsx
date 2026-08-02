import Navbar from "@/components/shared/navbar";
import { getMe } from "@/services/getme";

export default async function Home() {
  const user = await getMe();

  return (
    <>
      <Navbar user={user} />

      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="inline-block ">
          <h1 className="text-4xl font-bold py-5">Welcome to RentNest</h1>

          <h1 className="text-3xl font-bold">Please go to Properties page</h1>
        </div>
      </main>
    </>
  );
}
