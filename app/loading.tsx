import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-14">
      <div className="mb-10 text-center">
        <Skeleton className="mx-auto h-10 w-80" />
        <Skeleton className="mx-auto mt-4 h-5 w-[500px]" />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-4 rounded-xl border p-4">
            <Skeleton className="h-56 w-full rounded-lg" />

            <Skeleton className="h-6 w-2/3" />

            <Skeleton className="h-4 w-1/2" />

            <Skeleton className="h-4 w-1/3" />

            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
