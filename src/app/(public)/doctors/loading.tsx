import { Skeleton } from "@/components/ui/skeleton";

export default function DoctorsDirectoryLoading() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading doctors directory"
      className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:grid-cols-4"
    >
      <div className="mb-4 flex gap-2 overflow-hidden md:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-11 w-32 shrink-0 rounded-md" />
        ))}
      </div>

      <div className="hidden flex-col gap-2 md:flex">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} className="h-11 w-full rounded-md" />
        ))}
      </div>

      <div className="space-y-6 md:col-span-3">
        <Skeleton className="h-10 max-w-md rounded-md" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="aspect-4/5 w-full rounded-xl" />
          ))}
        </div>
        <div className="mt-12 flex justify-center gap-2 py-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-12 rounded-md" />
          ))}
        </div>
      </div>
    </section>
  );
}
