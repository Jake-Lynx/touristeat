import { getMealsPaginated } from "@/actions/meals";
import DetailedCard from "@/components/card/detailed-card";
import { PaginationWithLinks } from '@/components/ui/pagination-with-links';


export default async function RecipeList({ query, currentPage, pageSize }: { 
    query: string, 
    currentPage: number, 
    pageSize: number 
}) {
    const {meals, totalMeals} = await getMealsPaginated(currentPage, pageSize, query)

    return (
        <>
            <div className="recipe-list">
                {meals.length === 0 
                    ? (<p>Aucun plat ne correspond à la recherche</p>)
                    : (meals.map((meal) => (
                        <DetailedCard
                            key={meal.id}
                            slug={meal.slug}
                            title={meal.title}
                            country={meal.country}
                            imageUrl={meal.imageUrl}
                        />
                    )))
                }
            </div>
            
            <div className="mt-20">
                <PaginationWithLinks
                    page={currentPage}
                    pageSize={pageSize}
                    totalCount={totalMeals}
                />
            </div>
        </>
    )
}