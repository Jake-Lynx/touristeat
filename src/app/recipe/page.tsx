// Components
import HeroRecipe from '@/components/hero/hero-recipe';
import SearchBar from '@/components/ui/search-bar';
import { SkeletonMealCard } from '@/components/skeleton/skeleton-meal-card';

// Actions & other lib
import { Suspense } from 'react';
import RecipeList from './recipe-list';

export default async function Recipe(
    {searchParams}: {searchParams : Promise<{ query?: string; page?: string }>}
) {
    const params = await searchParams
    const query = params.query || ''
    const currentPage = Number(params.page) || 1
    const pageSize = 4
        

    return (
        <>
            <HeroRecipe />

            {/* Barre de recherche */}
            <SearchBar query={query} />

            {/* Recipe content */}
            {/* Déplacer le fetch des données dans le composant suspense */}
            <section className="recipe-content">
                <Suspense
                    key={query + currentPage}
                    fallback={<SkeletonMealCard />}
                >
                    <RecipeList
                        query={query}
                        currentPage={currentPage} 
                        pageSize={pageSize}
                    />
                </Suspense>
            </section>
        </>
    )
}
