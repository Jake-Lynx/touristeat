import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonRecipePage() {
  return (
    <>
      {/* Hero section skeleton */}
      <section className="relative h-[400px]">
        <Skeleton className="w-full h-full" />
        <div className="absolute bottom-10 left-10">
          <Skeleton className="h-8 w-[300px] mb-2" /> {/* Title */}
          <Skeleton className="h-6 w-[200px]" /> {/* Country */}
        </div>
      </section>

      {/* Recipe content skeleton */}
      <section className="specific-recipe-content">
        <div className="specific-recipe-content__process">
          {/* Ingredients section */}
          <div className="mb-5">
            <Skeleton className="h-8 w-[200px] mx-auto mb-3" /> {/* Section title */}
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={`ingredient-${index}`} className="h-4 w-full" />
              ))}
            </div>
          </div>

          {/* Instructions section */}
          <div className="mb-5">
            <Skeleton className="h-8 w-[200px] mx-auto mb-3" /> {/* Section title */}
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={`instruction-${index}`} className="h-4 w-full" />
              ))}
            </div>
          </div>

          <Skeleton className="h-10 w-[200px] mx-auto" /> {/* CTA button */}
        </div>

        {/* Timing section */}
        <div className="specific-recipe-content__timing">
          <Skeleton className="h-[200px] w-[172px] mb-3" /> {/* Timer icon */}
          <Skeleton className="h-8 w-[100px]" /> {/* Cooking time */}
        </div>
      </section>
    </>
  )
}