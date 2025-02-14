'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import {useDebouncedCallback} from 'use-debounce'
import { Search as SearchIcon} from 'lucide-react'


export default function SearchBar({query}: {query: string}) {
    const searchParams = useSearchParams()
    const router = useRouter()
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value
        const params = new URLSearchParams(searchParams.toString()) // Clone actuals settings
 
        if (newQuery) {
            params.set('query', newQuery)
        } else {
            params.delete('query') // delete if field is empty
        }

        // update url without page reload
        router.push(`?${params.toString()}`, {scroll: false})
    }

    // Limit URL update requests
    const debouncedHandleSearchChange = useDebouncedCallback(handleSearchChange, 500)
    
    return (
        <div className="recipe-hero__second-section">
            <h2 className="recipe-hero__subtitle">
                Trouver la recette qui vous fera saliver
            </h2>
            <div className="search-field">
                <SearchIcon
                    className="search-field__icon" 
                    style={{width: '16px', height: '16px'}}
                />
                <input
                    className="search-field__input" 
                    type="text"
                    defaultValue={query}
                    onChange={debouncedHandleSearchChange}
                    placeholder="Chercher une recette"
                />
            </div>
        </div>
    )
}
