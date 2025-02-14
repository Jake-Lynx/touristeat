// Components
import HeroRecipe from '@/components/hero/hero-recipe';
import SearchBar from '@/components/ui/search-bar';
import { SkeletonCard } from '@/components/card/skeleton-card';

// Actions & other lib
import { Suspense } from 'react';
import RecipeList from './recipe-list';

type RecipeProps = {
    searchParams: {
        query?: string;
        page?: string;
    }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

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
                    fallback={<SkeletonCard />}
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
