import { getMeals } from '@/actions/meals'
import { MealDataTableProps } from '@/lib/definition'
import Link from 'next/link'
import React from 'react'

import { columns } from './columns'
import { DataTable } from './data-table'

async function getData(): Promise<MealDataTableProps[]> {
    // fetch data
    const meals = await getMeals()

    return meals
}

const MealList = async () => {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <Link
                href="/admin/meals/operation"
                className='rounded-2xl p-1 text-white bg-red-400 hover:bg-red-500 float-right'
            >
                Ajouter une recette
            </Link>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default MealList
