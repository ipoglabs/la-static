"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function PolicySkeleton() {
  return (
    <div className="space-y-8">

      {/* Section 1 */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-1/2" /> {/* Title */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
      </div>

      {/* Section 2 */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-2/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      {/* Section 3 */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Bullet / list style */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-1/3 mb-2" />
        <div className="space-y-2 pl-2">
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-3/6" />
        </div>
      </div>

      {/* Final Section */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

    </div>
  )
}