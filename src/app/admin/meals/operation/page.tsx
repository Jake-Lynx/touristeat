import MealForm from '@/components/form/meal-form'
import Link from 'next/link'
import React from 'react'

export default function OperationMeal() {
    return (
        <div>
            <Link href="/admin/meals">Retour</Link>
            <MealForm />
        </div>
    )
}
