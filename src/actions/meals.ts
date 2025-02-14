'use server'

import prisma from "@/lib/prisma"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { unstable_cache } from "next/cache"
import slugify from "react-slugify"
import { operationMealSchema } from "@/utils/schema"


// CREATE meal
export async function createMeal(formData: FormData) {
    try {
        // Enregistrer le plat en base de donnée
        const data = Object.fromEntries(formData.entries()) as Record<string, string>
        const mealSlug = slugify(data.title)
        const parsedData = operationMealSchema.parse({
            title: data.title,
            country: data.country,
            imageUrl: data.imageUrl,
            ingredients: data.ingredients,
            cookingProcess: data.cookingProcess,
            cookingTime: data.cookingTime,
        })

        const meal = await prisma.meal.create({
            data: {
                ...parsedData,
                slug: mealSlug
            }
        })

        // Revalidate & refresh cache
        revalidateTag('meals')

        // Retourner un objet de succès avant la redirection
        return {
            success: true,
            data: meal
        }
        
    } catch (error) {
        return {
            sucess: false,
            message: `Erreur base de données: échec lors de la création du plat: ${error}`,
        }
    }
}

// GET all meals without paginate them
export async function getMeals() {
    try {
        // Cache data for memory performance
        const meals = unstable_cache(
            async () => {
                return await prisma.meal.findMany({
                    orderBy: {createdAt: 'desc'},
                    // Select only necessary fields
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        imageUrl: true,
                        country: true,
                    },
                    // take: 7, // Limit the number of meals to 7
                });
            },
            ['meals-short-list'], // cache key
            {
                revalidate: 3600, // revalidate every hour
                tags: ['meals'], // cache tag
            }
        );

        return await meals()
    } catch (error) {
        console.log(error);
        throw new Error(`Echec de récupération des plats: ${error}`);
    }
}

// GET all meals and paginate them
export const getMealsPaginated = unstable_cache(
    async (
        currentPage: number = 1,
        pageSize: number = 3,
        query?: string
    ) => {
        const skip = (currentPage - 1) * pageSize

        // Make searrch on recipe title and country
        const whereClause = {
            OR: [
                {
                    title: {
                        contains: query,
                        mode: 'insensitive' as const
                    }
                },
                {
                    country: {
                        contains: query,
                        mode: 'insensitive' as const
                    }
                },
            ]
        }

        try {
            const [meals, totalMeals] = await Promise.all([
                prisma.meal.findMany({
                    where: whereClause,
                    skip,
                    take: pageSize,
                    orderBy: {createdAt: 'desc'},
                    select: {
                        id: true,
                        slug: true,
                        title: true,
                        imageUrl: true,
                        country: true,
                    }
                }),
                prisma.meal.count({where: whereClause})
            ])

            const totalPages = Math.ceil(totalMeals / pageSize)

            return {meals, totalPages, totalMeals}
        } catch (error) {
            throw new Error(`Echec de récupération des plats: ${error}`)
        }
    },
    ['meals-paginated'],
    {
        revalidate: 3600, // revalidate every hour
        tags: ['meals'], // cache tag
    }
)

// GET specific meal by slug
export const getMealBySlug = async (slug: string) => {
    try {
        const meal = await prisma.meal.findUnique({
            where: {
                slug: slug
            }
        })

        return meal
    } catch (error) {
        throw new Error(`Echec de récupération du plat: ${error}`)
    }
}

// UPDATE meal
export async function updateMeal(
    id: string,
    formData: FormData
) {
    try {
        const data = Object.fromEntries(formData.entries()) as Record<string, string>
        // create slug from title in case of old title update
        const mealSlug = slugify(data.title)

        const parsedData = operationMealSchema.parse({
            title: data.title,
            country: data.country,
            imageUrl: data.imageUrl,
            ingredients: data.ingredients,
            cookingProcess: data.cookingProcess,
            cookingTime: data.cookingTime,
        })

        const updatedMeal =await prisma.meal.update({
            where: {
                id: id
            },
            data: {
                ...parsedData,
                slug: mealSlug
            }
        })
        // Revalidate & refresh cache
        revalidateTag('meals')
    
        return {
            success: true,
            data: updatedMeal,
        }
    } catch (error) {
        return {
            sucess: false,
            message: `Echec de la mise à jour du plat: ${error}`,
        }
    }    
}

// DELETE meal
export async function deleteMeal(id: string) {
    try {
        await prisma.meal.delete({
            where: {
                id: id
            }
        })
    } catch (error) {
        return {
            message: `Echec de la suppression du plat: ${error}`
        }
    }

    // Revalidate & refresh cache
    revalidateTag('meals')

    // Redirect to meals page after deleting the meal
    redirect('/admin/meals')
}