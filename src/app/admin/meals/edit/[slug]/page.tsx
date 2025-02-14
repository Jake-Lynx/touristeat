import MealForm from '@/components/form/meal-form';
import { getMealBySlug } from '@/actions/meals';
import Link from 'next/link';
import React from 'react';


export default async function EditMeal(
    { params, }: {params: Promise<{slug: string}>}
) {
    const slug = (await params).slug

    const meal = await getMealBySlug(slug);

    if (!meal) {
        return <p>Oups ! Plat non trouvé.</p>;
    }

    return (
        <div>
            <h1>Edit Meal:</h1>
            <Link href="/admin/meals">
                Revenir à la liste
            </Link>
            <MealForm 
                mode='edit' 
                initialData={{
                    ...meal,
                    cookingTime: Number(meal.cookingTime)
                }}
            />
        </div>
    );
}
