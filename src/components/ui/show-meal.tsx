// Actions
import { getMeals } from "@/actions/meals"

// Components
import SimpleCard from "@/components/card/simple-card"
import ChiefCard from "@/components/card/chief-card"


export default async function ShowMeal(
    {card}: {card: string}
) {
    const meals = await getMeals()

    const mealsToShow = card === 'simple'
        ? meals.slice(0,4)
        : meals.slice(3,7)

    return (
        <div className="home-recipe__list">
            {mealsToShow.map((meal, index) => {
                let customClass = ''
                if (index === 2) {
                    customClass = 'above-xs'
                } else if (index === 3) {
                    customClass = 'only-xl'
                }

                return (
                    card === 'simple'
                    ? <SimpleCard
                        key={meal.id}
                        id={meal.id}
                        title={meal.title}
                        imageUrl={meal.imageUrl}
                        className={customClass}
                    />
                    : <ChiefCard
                        key={meal.id}
                        title={meal.title}
                        imageUrl={meal.imageUrl}
                        country={meal.country}
                        className={customClass}
                    />
                )
            })}
        </div>
    )
}