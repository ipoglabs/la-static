function SkeletonBox({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`animate-pulse bg-slate-300 rounded ${className}`} style={style} />;
}

export default function ListingPageSkeleton() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">

      {/* HEADER SKELETON */}
      <div className="bg-white border-b border-slate-200 h-14 flex items-center px-4 sm:px-6 lg:px-16 gap-3">
        <div className="flex items-center gap-2">
          <SkeletonBox className="w-8 h-8 rounded-md" />
          <SkeletonBox className="w-24 h-[18px] rounded-full" />
        </div>
        <SkeletonBox className="w-16 h-5 rounded-full" />
        <div className="flex-1" />
        <SkeletonBox className="w-7 h-7 rounded-full" />
        <SkeletonBox className="w-20 h-8 rounded-full" />
        <SkeletonBox className="w-9 h-9 rounded-full" />
      </div>
{/* SEARCH BAR */}
<div className="bg-slate-800 py-2">
  <div className="container mx-auto px-4 sm:px-6 lg:px-16 flex flex-col sm:flex-row gap-2">
    <div className="animate-pulse h-[30px] w-full rounded bg-slate-600" />
    <div className="animate-pulse h-[30px] w-full rounded bg-slate-600" />
  </div>
</div>

      {/* BREADCRUMB BAR */}
      <div className="bg-slate-50 border-b border-slate-200 py-1">
        <div className="container mx-auto h-8 flex items-center px-4 sm:px-6 lg:px-16 gap-2">
          <SkeletonBox className="w-5 h-5 rounded-full" />
          <SkeletonBox className="w-3 h-3 rounded-full" />
          <SkeletonBox className="w-24 h-3 rounded-full" />
          <SkeletonBox className="w-3 h-3 rounded-full" />
          <SkeletonBox className="w-20 h-3 rounded-full" />
          <div className="flex-1" />
          <SkeletonBox className="w-24 h-3 rounded-full" />
        </div>
      </div>

      {/* MAIN */}
      <div className="container mx-auto flex flex-row items-start flex-nowrap gap-4 px-4 sm:px-6 lg:px-16 py-4 flex-1">

        {/* SIDEBAR */}
        <div className="w-64 flex-none bg-white border border-slate-300 rounded-md shadow-sm hidden md:flex flex-col">
          <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-slate-200">
            <SkeletonBox className="w-5 h-5" />
            <SkeletonBox className="w-16 h-4 rounded-full" />
          </div>
          <div className="px-4 flex-1">
            <div className="border-b border-slate-200 mt-3 pb-3">
              <SkeletonBox className="w-24 h-3 mb-3 rounded-full" />
              <div className="flex gap-2 items-end">
                <SkeletonBox className="flex-1 h-7 rounded-md" />
                <SkeletonBox className="w-3 h-3 rounded-full mb-2" />
                <SkeletonBox className="flex-1 h-7 rounded-md" />
              </div>
            </div>
            <div className="border-b border-slate-200 mt-3 pb-3">
              <SkeletonBox className="w-28 h-3 mb-3 rounded-full" />
              <div className="flex flex-wrap gap-2">
                {[68, 90, 60, 78, 60, 82].map((w, i) => (
                  <SkeletonBox key={i} className="h-6 rounded-full" style={{ width: w }} />
                ))}
              </div>
            </div>
            <div className="border-b border-slate-200 mt-3 pb-3">
              <SkeletonBox className="w-36 h-3 mb-3 rounded-full" />
              <div className="flex gap-2 items-end">
                <SkeletonBox className="flex-1 h-7 rounded-md" />
                <SkeletonBox className="w-3 h-3 rounded-full mb-2" />
                <SkeletonBox className="flex-1 h-7 rounded-md" />
              </div>
            </div>
            <div className="border-b border-slate-200 mt-3 pb-3">
              <SkeletonBox className="w-24 h-3 mb-3 rounded-full" />
              <SkeletonBox className="w-full h-7 rounded-md" />
            </div>
            <div className="border-b border-slate-200 mt-3 pb-3">
              <SkeletonBox className="w-20 h-3 mb-3 rounded-full" />
              <div className="flex gap-2">
                {[60, 64, 88].map((w, i) => (
                  <SkeletonBox key={i} className="h-6 rounded-full" style={{ width: w }} />
                ))}
              </div>
            </div>
            <div className="mt-3 pb-3">
              <SkeletonBox className="w-16 h-3 mb-3 rounded-full" />
              <div className="flex gap-2">
                <SkeletonBox className="w-16 h-6 rounded-full" />
                <SkeletonBox className="w-14 h-6 rounded-full" />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 border-t border-slate-200">
            <SkeletonBox className="w-full h-8 rounded-full" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 max-sm:w-full">
          <div className="flex items-center gap-2 mb-3">
            <SkeletonBox className="w-9 h-9 rounded-lg md:hidden" />
            <SkeletonBox className="w-24 h-5 rounded-full" />
            <div className="flex-1" />
            <SkeletonBox className="w-28 h-8 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden border border-slate-200">
                <SkeletonBox className="h-40 w-full rounded-none" />
                <div className="px-4 pt-2 pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <SkeletonBox className="w-28 h-5 rounded-full" />
                    <div className="flex-1" />
                    <SkeletonBox className="w-7 h-7 rounded" />
                  </div>
                  <SkeletonBox className="w-full h-3 mb-1.5 rounded-full" />
                  <SkeletonBox className="w-3/4 h-3 mb-3 rounded-full" />
                  <div className="flex gap-2 mb-3">
                    <SkeletonBox className="w-12 h-2.5 rounded-full" />
                    <SkeletonBox className="w-12 h-2.5 rounded-full" />
                    <SkeletonBox className="w-16 h-2.5 rounded-full" />
                  </div>
                  <div className="flex items-center">
                    <SkeletonBox className="w-24 h-3 rounded-full" />
                    <div className="flex-1" />
                    <SkeletonBox className="w-10 h-3 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER SKELETON */}
      <div className="bg-slate-800 px-4 sm:px-6 lg:px-16 pt-8 pb-4 mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          {[120, 80, 80, 80].map((w, col) => (
            <div key={col} className="flex flex-col gap-2">
              <SkeletonBox className="h-3.5 rounded-full mb-1" style={{ width: w, background: '#475569' }} />
              {[100, 80, 90, 70].map((lw, j) => (
                <div key={j} className="h-2.5 rounded-full animate-pulse bg-slate-600 opacity-50" style={{ width: lw }} />
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-slate-700 pt-4 flex items-center gap-4">
          <div className="h-2.5 w-32 rounded-full animate-pulse bg-slate-600 opacity-50" />
          <div className="flex-1" />
          {[80, 80, 80].map((w, i) => (
            <div key={i} className="h-2.5 rounded-full animate-pulse bg-slate-600 opacity-50" style={{ width: w }} />
          ))}
        </div>
      </div>

    </div>
  );
}