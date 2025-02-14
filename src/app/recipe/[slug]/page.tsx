import HeroSpecificMeal from "@/components/hero/hero-specific-meal";
import DisplayContent from "@/components/ui/display-content";
import { getMealBySlug } from "@/actions/meals";
import Image from "next/image";
import Link from "next/link";

export default async function DisheRecipe(
    {params}: {params: Promise<{slug: string}>}
) {
    const slug = (await params).slug;

    const meal = await getMealBySlug(slug)

    if (!meal) {
        return 'Plat introuvable';
    }

    return (
        <>
            {/* Hero section */}
            <HeroSpecificMeal
                title={meal.title}
                country={meal.country}
                imageUrl={meal.imageUrl}
            />

            {/* Meal cook process */}
            <section className="specific-recipe-content">
                <div className="specific-recipe-content__process">
                    <div className="mb-5">
                        <h2 className="text-center mb-3">Ingrédients</h2>
                        <DisplayContent
                            content={meal.ingredients as string}
                        />
                    </div>
                    <div className="mb-5">
                        <h2 className="text-center mb-3">Instructions</h2>
                        <DisplayContent
                            content={meal.cookingProcess as string}
                        />
                    </div>
                    <Link href="/recipe" className="cta">Voir d'autres recettes</Link>
                </div>

                <div className="specific-recipe-content__timing">
                    <Image 
                        className="specific-recipe-content__timing-icon"
                        src="/icons/icon_timer.svg" 
                        alt="Compte à rebours"
                        width={172}
                        height={200}
                    />
                    <h2     
                        className="specific-recipe-content__timing-title"
                    >
                        {`${meal.cookingTime}min`}
                    </h2>
                </div>
            </section>
        </>
    )
}
