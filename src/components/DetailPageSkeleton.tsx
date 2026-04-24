function SkeletonBox({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`animate-pulse bg-slate-300 rounded ${className}`} style={style} />;
}
function SkeletonLogoSVG({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 712 712"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-pulse"
    >
      <path
        d="M0 173C0 77.4547 77.4547 0 173 0H539C634.545 0 712 77.4547 712 173V539C712 634.545 634.545 712 539 712H173C77.4547 712 0 634.545 0 539V173Z"
        fill="#cbd5e1"
      />
      <path
        d="M164.577 643.191L163.74 643.629C182.609 628.373 185.419 540.452 79.8331 530.817C97.8991 499.502 133.63 495.086 148.885 492.677L174.579 487.458C217.938 474.29 258.486 435.669 273.34 418.004C322.292 359.792 331.821 285.52 328.341 253.804C319.107 194.789 344.801 150.627 355.239 137.78C390.89 90.8892 432.455 77.0252 448.781 75.9546C408.956 263.841 547.007 311.883 621.011 312.419C579.9 381.471 503.782 390.705 468.855 386.69C286.589 382.675 226.369 520.378 220.347 568.956C214.373 617.139 198.526 625.43 164.577 643.191Z"
        fill="#94a3b8"
      />
      <path
        d="M652 222.803C652 311.612 580.006 383.606 491.197 383.606C402.388 383.606 330.394 311.612 330.394 222.803C330.394 133.994 402.388 62 491.197 62C580.006 62 652 133.994 652 222.803Z"
        fill="#94a3b8"
      />
      <path
        d="M217.211 573.394C217.211 615.702 182.914 649.999 140.606 649.999C98.2975 649.999 64 615.702 64 573.394C64 531.086 98.2975 496.788 140.606 496.788C182.914 496.788 217.211 573.394Z"
        fill="#94a3b8"
      />
    </svg>
  );
}
export default function DetailPageSkeleton() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">

      {/* HEADER SKELETON */}
      <div className="bg-white border-b border-slate-200 h-14 flex items-center px-4 sm:px-6 lg:px-16 gap-3">
        <div className="flex items-center gap-2">
           <SkeletonLogoSVG size={32} />
        </div>
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
      <div className="bg-slate-800 sm:rounded-b-md mx-auto w-full max-w-screen-2xl">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 h-9 flex items-center gap-2">
          <SkeletonBox className="w-5 h-5 rounded-full" style={{ background: '#475569' }} />
          <SkeletonBox className="w-3 h-3 rounded-full" style={{ background: '#475569' }} />
          <SkeletonBox className="w-20 h-3 rounded-full" style={{ background: '#475569' }} />
          <SkeletonBox className="w-3 h-3 rounded-full" style={{ background: '#475569' }} />
          <SkeletonBox className="w-24 h-3 rounded-full" style={{ background: '#475569' }} />
          <div className="flex-1" />
          <SkeletonBox className="w-7 h-7 rounded-full" style={{ background: '#475569' }} />
          <SkeletonBox className="w-20 h-3 rounded-full hidden sm:block" style={{ background: '#475569' }} />
        </div>
      </div>

      {/* TITLE BAR */}
      <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 mt-2">
        <div className="flex flex-col items-stretch bg-white px-4 py-4 border-b border-slate-900/25 sm:rounded-b-md sm:border-x sm:border-b sm:shadow-md sm:shadow-black/10 gap-2">
          <SkeletonBox className="w-3/4 h-5 rounded-full" />
          <SkeletonBox className="w-1/2 h-4 rounded-full" />
          <div className="flex items-center gap-2 mt-1">
            <SkeletonBox className="w-4 h-4 rounded-full" />
            <SkeletonBox className="w-48 h-3 rounded-full" />
            <div className="flex-1" />
            <SkeletonBox className="w-24 h-7 rounded-full" />
          </div>
        </div>
      </div>

      {/* MAIN BODY */}
      <div className="max-w-screen-2xl mx-auto w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 py-2 flex-1">
        <div className="md:grid md:grid-cols-3 gap-x-2 flex flex-col gap-y-2">

          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-y-2 col-span-1 md:col-span-2">

            {/* Gallery card */}
            <div className="bg-white px-4 py-5 flex flex-col gap-3 border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md">
              <SkeletonBox className="w-full h-48 rounded-sm" />
              <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                  <SkeletonBox key={i} className="w-12 h-12 rounded-none" />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <SkeletonBox className="w-28 h-7 rounded-full" />
                <div className="flex-1" />
                <SkeletonBox className="w-9 h-9 rounded" />
                <SkeletonBox className="w-9 h-9 rounded" />
              </div>
            </div>

            {/* Seller Info — mobile only */}
            <div className="md:hidden bg-white px-4 py-5 border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md flex flex-col gap-3">
              <SkeletonBox className="w-28 h-5 rounded-full" />
              <div className="flex gap-3">
                <SkeletonBox className="w-28 h-28 rounded-full flex-none" />
                <div className="flex-1 flex flex-col gap-2">
                  <SkeletonBox className="w-32 h-5 rounded-full" />
                  <SkeletonBox className="w-full h-3 rounded-full" />
                  <SkeletonBox className="w-4/5 h-3 rounded-full" />
                  <div className="flex gap-2 mt-1">
                    <SkeletonBox className="w-20 h-6 rounded-md" />
                    <SkeletonBox className="w-16 h-6 rounded-md" />
                    <SkeletonBox className="w-16 h-6 rounded-md" />
                  </div>
                </div>
              </div>
              <SkeletonBox className="w-56 h-3 rounded-full" />
            </div>

            {/* CTA mobile only */}
            <div className="md:hidden bg-slate-700 p-3 sm:rounded-b-md flex gap-3 -mt-4 z-10">
              <SkeletonBox className="flex-1 h-11 rounded-lg" style={{ background: '#475569' }} />
              <SkeletonBox className="flex-1 h-11 rounded-lg" style={{ background: '#475569' }} />
            </div>

            {/* Description */}
            <div className="bg-white px-4 py-5 border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <SkeletonBox className="w-24 h-5 rounded-full" />
                <SkeletonBox className="w-28 h-3 rounded-full" />
              </div>
              <SkeletonBox className="w-full h-3 rounded-full" />
              <SkeletonBox className="w-11/12 h-3 rounded-full" />
              <SkeletonBox className="w-4/5 h-3 rounded-full" />
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {["w-24", "w-28", "w-20", "w-32"].map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <SkeletonBox className="w-6 h-6 rounded-full flex-none" />
                    <SkeletonBox className={`${w} h-3 rounded-full`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Key Details 1 */}
            <div className="bg-white px-4 py-5 border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md flex flex-col gap-3">
              <SkeletonBox className="w-28 h-5 rounded-full" />
              <div className="flex flex-col gap-0">
                {[["w-20", "w-24"], ["w-16", "w-20"], ["w-24", "w-28"], ["w-18", "w-22"]].map(([k, v], i) => (
                  <div key={i} className={`flex gap-0 border-b border-slate-200 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                    <div className="w-1/2 px-5 py-2 border-r border-slate-200"><SkeletonBox className={`${k} h-3 rounded-full`} /></div>
                    <div className="w-1/2 px-5 py-2"><SkeletonBox className={`${v} h-3 rounded-full`} /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Details 2 */}
            <div className="bg-white px-4 py-5 border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md flex flex-col gap-3">
              <SkeletonBox className="w-28 h-5 rounded-full" />
              <div className="flex flex-col gap-0">
                {[["w-22", "w-28"], ["w-16", "w-24"], ["w-20", "w-20"], ["w-24", "w-16"]].map(([k, v], i) => (
                  <div key={i} className={`flex gap-0 border-b border-slate-200 ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                    <div className="w-1/2 px-5 py-2 border-r border-slate-200"><SkeletonBox className={`${k} h-3 rounded-full`} /></div>
                    <div className="w-1/2 px-5 py-2"><SkeletonBox className={`${v} h-3 rounded-full`} /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Facts from Google */}
            <div className="bg-white px-4 py-5 border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md flex flex-col gap-2">
              <SkeletonBox className="w-36 h-5 rounded-full mb-2" />
              {["w-32", "w-28", "w-36"].map((w, i) => (
                <div key={i} className="flex items-center justify-between border-t border-slate-200 py-3">
                  <SkeletonBox className={`${w} h-4 rounded-full`} />
                  <SkeletonBox className="w-5 h-5 rounded-full" />
                </div>
              ))}
            </div>

            {/* Map Snap — mobile only */}
            <div className="md:hidden bg-white border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md">
              <div className="px-4 pt-5 pb-3">
                <SkeletonBox className="w-32 h-5 rounded-full" />
              </div>
              <div className="w-full p-1">
                <SkeletonBox className="w-full h-40 rounded-b-md rounded-none" />
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-200 px-4 py-5 border-y border-yellow-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md flex flex-col gap-3">
              <SkeletonBox className="w-24 h-5 rounded-full" style={{ background: '#a16207', opacity: 0.5 }} />
              <SkeletonBox className="w-full h-3 rounded-full" style={{ background: '#a16207', opacity: 0.3 }} />
              <SkeletonBox className="w-11/12 h-3 rounded-full" style={{ background: '#a16207', opacity: 0.3 }} />
              <SkeletonBox className="w-3/4 h-3 rounded-full" style={{ background: '#a16207', opacity: 0.3 }} />
            </div>

            {/* Adv ID & Report */}
            <div className="bg-white px-4 py-4 border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md flex items-center gap-4">
              <SkeletonBox className="w-24 h-3 rounded-full" />
              <SkeletonBox className="w-20 h-7 rounded-full" style={{ background: '#fca5a5' }} />
            </div>

            {/* ChitChat — mobile only */}
            <div className="md:hidden bg-white px-4 py-5 border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md flex flex-col gap-3">
              <SkeletonBox className="w-20 h-6 rounded-full" />
              <SkeletonBox className="w-44 h-3 rounded-full" />
              <div className="bg-slate-200 rounded-xl px-4 py-4 flex flex-col gap-3">
                <div className="flex justify-end">
                  <SkeletonBox className="w-3/5 h-8 rounded-lg" style={{ background: '#93c5fd' }} />
                </div>
                <div className="flex justify-start">
                  <SkeletonBox className="w-1/2 h-8 rounded-lg" style={{ background: '#fff' }} />
                </div>
                <div className="flex justify-end">
                  <SkeletonBox className="w-3/4 h-10 rounded-lg" style={{ background: '#93c5fd' }} />
                </div>
              </div>
              <div className="flex gap-3 items-center h-12">
                <SkeletonBox className="flex-1 h-9 rounded-lg" />
                <SkeletonBox className="w-20 h-9 rounded-lg" style={{ background: '#93c5fd' }} />
              </div>
            </div>

          </div>{/* end left col */}

          {/* RIGHT COLUMN */}
          <div className="max-md:hidden md:col-span-1 flex flex-col gap-y-2">

            {/* Seller card */}
            <div className="bg-white border border-slate-900/25 rounded-md shadow-black/10 shadow-md overflow-hidden">
              {/* Banner */}
              <SkeletonBox className="w-full h-32 rounded-none" />
              <div className="flex flex-col items-center px-5 pb-5">
                {/* Avatar */}
                <SkeletonBox className="w-32 h-32 rounded-full border-4 border-white -mt-16 flex-none" />
                <SkeletonBox className="w-36 h-5 rounded-full mt-3" />
                <SkeletonBox className="w-44 h-3 rounded-full mt-2" />
                <SkeletonBox className="w-40 h-3 rounded-full mt-1.5 italic" />
                <SkeletonBox className="w-28 h-7 rounded-md mt-3" />
                <SkeletonBox className="w-52 h-3 rounded-full mt-3" />
                <div className="flex gap-3 mt-3">
                  <SkeletonBox className="w-20 h-7 rounded-md" />
                  <SkeletonBox className="w-24 h-7 rounded-md" />
                </div>
                {/* CTA buttons */}
                <div className="w-full flex flex-col gap-2 mt-5">
                  <SkeletonBox className="w-full h-10 rounded-lg" />
                  <SkeletonBox className="w-full h-10 rounded-lg" style={{ background: '#fca5a5' }} />
                </div>
              </div>
            </div>

            {/* ChitChat — desktop */}
            <div className="bg-white px-4 py-5 border border-slate-900/25 rounded-md shadow-black/10 shadow-md flex flex-col gap-3">
              <SkeletonBox className="w-20 h-6 rounded-full" />
              <SkeletonBox className="w-44 h-3 rounded-full" />
              <div className="bg-slate-200 rounded-xl px-4 py-4 flex flex-col gap-3">
                <div className="flex justify-end">
                  <SkeletonBox className="w-3/5 h-8 rounded-lg" style={{ background: '#93c5fd' }} />
                </div>
                <div className="flex justify-start">
                  <SkeletonBox className="w-1/2 h-8 rounded-lg" style={{ background: '#fff' }} />
                </div>
                <div className="flex justify-end">
                  <SkeletonBox className="w-3/4 h-10 rounded-lg" style={{ background: '#93c5fd' }} />
                </div>
              </div>
              <div className="flex gap-3 items-center h-12">
                <SkeletonBox className="flex-1 h-9 rounded-lg" />
                <SkeletonBox className="w-11 h-9 rounded-lg" style={{ background: '#93c5fd' }} />
              </div>
            </div>

            {/* Map Snap — desktop */}
            <div className="bg-white border border-slate-900/25 rounded-md shadow-black/10 shadow-md overflow-hidden">
              <div className="px-4 pt-5 pb-3">
                <SkeletonBox className="w-32 h-5 rounded-full" />
              </div>
              <div className="w-full p-1">
                <SkeletonBox className="w-full h-40 rounded-b-sm" />
              </div>
            </div>

          </div>{/* end right col */}

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