"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function PolicySkeleton() {
  return (
    <div className="space-y-6">

      {/* Intro paragraph */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-10/12" />
      </div>

      {/* Section 1 */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/3" /> {/* Heading */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
      </div>

      {/* Section 2 */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-10/12" />
      </div>

      {/* Section 3 */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-9/12" />
      </div>

      {/* Section 4 */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-8/12" />
      </div>

      {/* Section 5 */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-7/12" />
      </div>

    </div>
  )
}