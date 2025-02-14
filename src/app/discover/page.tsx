// Actions & other lib
import { Suspense } from 'react'

// Components
import HeroDiscover from '@/components/hero/hero-discover'
import ContinentMealCard from '@/components/card/continent-meal-card'
import { SkeletonMealCard } from '@/components/skeleton/skeleton-meal-card'

export default function Discover() {
    return (
        <>
            {/* Hero section */}
            <Suspense fallback={<p>...</p>}>
                <HeroDiscover />
            </Suspense>

            {/* Meals section */}
            <section className="discovery-content">
                <Suspense fallback={<SkeletonMealCard />}>
                    <ContinentMealCard />
                </Suspense>
            </section>
        </>
    )
}
