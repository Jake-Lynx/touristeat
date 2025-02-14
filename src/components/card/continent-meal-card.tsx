import { continents } from '@/lib/data'
import React from 'react'
import MealChiefIconCard from '@/components/card/chief-card'
import Link from 'next/link'
import { getMeals } from '@/actions/meals'
import countries from "i18n-iso-countries";
import frLocale from "i18n-iso-countries/langs/fr.json";

countries.registerLocale(frLocale);

export default async function ContinentMealCard() {
    const meals = await getMeals()
    
    if (!meals || meals.length === 0) {
        return <p>Oups! Aucun plat disponible pour l'instant</p>
    }
    
    return (
        <div className="discovery-recipe">
            {continents.map((continent) => {

                // Filtrer les plats par continent
                const continentMeals = meals.filter(
                    (meal) => continent.countries.includes(countries.getAlpha2Code(meal.country, "fr") || '')
                )
                

                // Ne pas afficher le continent s'il n'a pas de plats disponibles
                if (continentMeals.length === 0) {
                    return null;
                }

                return (
                <div key={continent.name}>
                    <h2 className="discovery-recipe__title">{continent.name}</h2>
                    <div className="discovery-recipe__list mb-[3rem]">
                        {continentMeals.map((meal) => (
                            <MealChiefIconCard
                                key={meal.id}
                                country={meal.country}
                                title={meal.title}
                                imageUrl={meal.imageUrl}
                            />
                        ))}
                    </div>

                    <div 
                        className="discovery-recipe__link-list"
                    >
                        <Link href="/recipe">
                            Voir toutes nos recettes
                        </Link>
                    </div>
                </div>
            )})}
        </div>
    )
}