import FeaturedProperties from "@/components/home/FeaturedProperties";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/shared/navbar";
import { getMe } from "@/services/getme";

export default async function Home() {
  const user = await getMe();

  return (
    <>
      <Navbar user={user} />

      <main className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="inline-block ">
          <Hero></Hero>
          <FeaturedProperties></FeaturedProperties>
        </div>
      </main>
    </>
  );
}
