export default function Loading() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="h-12 w-96 bg-slate-200 rounded animate-pulse mb-10" />
        <div className="flex gap-8">
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="h-96 bg-slate-100 rounded-2xl animate-pulse" />
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-slate-100 rounded-[2rem] animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
