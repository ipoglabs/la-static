function SkeletonBox({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`animate-pulse bg-slate-300 rounded ${className}`} style={style} />;
}

function SkeletonLogoSVG({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 712 712" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
      <path d="M0 173C0 77.4547 77.4547 0 173 0H539C634.545 0 712 77.4547 712 173V539C712 634.545 634.545 712 539 712H173C77.4547 712 0 634.545 0 539V173Z" fill="#cbd5e1"/>
      <path d="M164.577 643.191L163.74 643.629C182.609 628.373 185.419 540.452 79.8331 530.817C97.8991 499.502 133.63 495.086 148.885 492.677L174.579 487.458C217.938 474.29 258.486 435.669 273.34 418.004C322.292 359.792 331.821 285.52 328.341 253.804C319.107 194.789 344.801 150.627 355.239 137.78C390.89 90.8892 432.455 77.0252 448.781 75.9546C408.956 263.841 547.007 311.883 621.011 312.419C579.9 381.471 503.782 390.705 468.855 386.69C286.589 382.675 226.369 520.378 220.347 568.956C214.373 617.139 198.526 625.43 164.577 643.191Z" fill="#94a3b8"/>
      <path d="M652 222.803C652 311.612 580.006 383.606 491.197 383.606C402.388 383.606 330.394 311.612 330.394 222.803C330.394 133.994 402.388 62 491.197 62C580.006 62 652 133.994 652 222.803Z" fill="#94a3b8"/>
      <path d="M217.211 573.394C217.211 615.702 182.914 649.999 140.606 649.999C98.2975 649.999 64 615.702 64 573.394C64 531.086 98.2975 496.788 140.606 496.788C182.914 496.788 217.211 573.394Z" fill="#94a3b8"/>
    </svg>
  );
}

export default function HomePageSkeleton() {
  return (
    <div className="bg-slate-950/15 min-h-screen">

      {/* HEADER SKELETON */}
      <div className="bg-white border-b border-slate-200 h-14 flex items-center px-4 sm:px-6 lg:px-16 gap-3">
        <SkeletonLogoSVG size={32} />
        <div className="flex-1" />
        <SkeletonBox className="w-7 h-7 rounded-full" />
        <SkeletonBox className="w-20 h-8 rounded-full" />
        <SkeletonBox className="w-9 h-9 rounded-full" />
      </div>

      {/* SEARCH BAR SKELETON */}
      <div className="bg-slate-800 py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 flex flex-col sm:flex-row gap-2">
          <div className="animate-pulse h-[30px] w-full rounded bg-slate-600" />
          <div className="animate-pulse h-[30px] w-full rounded bg-slate-600" />
        </div>
      </div>

      {/* CATEGORY GRID SKELETON */}
      <div className="container mx-auto px-2 py-4 columns-1 sm:columns-2 md:columns-3 gap-4 max-w-screen-lg">
        {[8, 6, 12, 9, 5, 11, 8, 7, 6].map((itemCount, i) => (
          <div key={i} className="break-inside-avoid mb-4 w-full bg-white border border-slate-300 rounded-lg shadow-sm overflow-hidden">
            {/* Card header */}
            <div className="flex items-center px-2 pt-3 pb-3">
              <SkeletonBox className="flex-none mr-2 size-20 rounded-lg" />
              <div className="flex-1 pr-10">
                <SkeletonBox className="w-28 h-5 mb-2 rounded-full" />
                <SkeletonBox className="w-full h-3 mb-1 rounded-full" />
                <SkeletonBox className="w-3/4 h-3 rounded-full" />
              </div>
              <div className="absolute right-3">
                <SkeletonBox className="w-9 h-9 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* STATS SECTION SKELETON */}
      <div className="bg-slate-300 py-5 border-t border-slate-400">
        <div className="container mx-auto max-w-screen-lg grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-[25px] bg-white px-7 p-6">
              <SkeletonBox className="size-11 rounded-lg mb-3" />
              <SkeletonBox className="w-24 h-8 mb-2 rounded-full" />
              <SkeletonBox className="w-32 h-4 rounded-full" />
            </div>
          ))}
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
      </div>

    </div>
  );
}