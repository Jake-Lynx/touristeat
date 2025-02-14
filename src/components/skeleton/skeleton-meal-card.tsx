import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonMealCard() {
  return (
    <div className="flex">
      {Array.from({length: 4}).map((_, index) => (
        <div key={index} className="flex-row gap-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
