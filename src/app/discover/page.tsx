import HeroDiscover from '@/components/hero/hero-discover'
import ContinentMealCard from '@/components/card/continent-meal-card'

export default function Discover() {
    return (
        <>
            {/* Hero image */}
            <HeroDiscover />

            {/* Meals section */}
            <section className="discovery-content">
                <ContinentMealCard />
            </section>
        </>
    )
}
