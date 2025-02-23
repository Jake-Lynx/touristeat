'use client'

// React
import React, { useState } from 'react'

// Actions & other lib
import { createMeal, updateMeal } from '@/actions/meals'
import { generateContentAI } from '@/actions/googleAI'
import { CldUploadWidget } from 'next-cloudinary';
import countries from "i18n-iso-countries";
import frLocale from "i18n-iso-countries/langs/fr.json";
import { ImageUploadProps } from '@/lib/definition';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mealSchemaType, operationMealSchema, operationMealSchemaType } from '@/utils/schema';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Bot, Loader2Icon } from 'lucide-react';

// Next
import Image from 'next/image';

// Components
import TipTapEditor from '@/components/ui/tiptap';

countries.registerLocale(frLocale);

interface MealFormProps {
    mode?: 'create' | 'edit';
    initialData?: mealSchemaType;
}


export default function MealForm(
    {mode = 'create', initialData}: MealFormProps
) {
    const router = useRouter()

    // States
    const [hostedUrl, setHostedUrl] = useState(initialData?.imageUrl || '')
    const [loading, setLoading] = useState({name: '', status: false})

    // Countries config
    const countriesArray = countries.getNames("fr", {select: "official"})
    const allCountries = Object.values(countriesArray)  

    // React hook form config
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        setValue,
        getValues,
        reset,
        control,
    } = useForm<operationMealSchemaType>({
        resolver: zodResolver(operationMealSchema),
        defaultValues: initialData // if data is provided, in case of edit mode
    })

    // Handle image
    const handleImage = (results: ImageUploadProps) => {
        const url = typeof results.info === 'object' ? results.info.url || '' : ''
        setValue('imageUrl', url)
        setHostedUrl(url)
    }

    // Generate ingredients list
    const generateIngredientsContent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const title = getValues('title')
        const country = getValues('country')

        if (!title || !country) {
            toast.error("Veuillez préciser le nom du plat et le pays.")
            return
        }

        setLoading({name: 'ingredients', status: true})

        try {
            const ingredientsNeeded = await generateContentAI(`
                Generate a french detailed list of ingredients for "${title}" from "${country}". Each ingredient should include its name, recommended quantity, and a possible alternative if available. Organize the list by category (e.g., vegetables, spices, dairy products, etc.).
                Please return the response in JSON format like this:
                {
                    "ingredients": [
                        {
                            "category": "Légumes",
                            "elements": [
                                {
                                    "nom": "Carotte",
                                    "quantity": "2 moyennes",
                                    "alternative": "Panais"
                                },
                                {
                                    "nom": "Oignon",
                                    "quantity": "1 gros",
                                    "alternative": "Échalote"
                                }
                            ]
                        },
                        {
                            "category": "Épices",
                            "elements": [
                                {
                                    "nom": "Poivre noir",
                                    "quantity": "1 c. à café", 
                                    "alternative": "Poivre blanc"
                                }
                            ]
                        }
                    ]
                }
            `)
            
            // Formatage des ingrédients pour TipTap
            let formattedContent = ''
            
            ingredientsNeeded.ingredients.forEach((category: any) => {
                formattedContent += `<h3>${category.category}</h3>\n<ul>`
                
                category.elements.forEach((ingredient: any) => {
                    formattedContent += `
                        <li>
                            <strong>${ingredient.nom}</strong> - ${ingredient.quantity}
                            ${ingredient.alternative ? ` (Alternative : ${ingredient.alternative})` : ''}
                        </li>`
                })
                
                formattedContent += '</ul>\n'
            })

            // Mise à jour du contenu dans TipTap
            setValue('ingredients', formattedContent)
        } catch (error) {
            console.log(error)
            toast.error("Erreur lors de la génération des ingrédients")
        } finally {
            setLoading({name: 'ingredients', status: false})
        }
    }

    // Generate cooking process
    const generateProcessContent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const title = getValues('title')
        const country = getValues('country')
        const ingredients = getValues('ingredients')

        if (!title || !country || !ingredients) {
            toast.error("Veuillez préciser le nom du plat, le pays et les ingrédients au préalable.")
            return;
        }

        setLoading({name: 'process', status: true})
        
        try {

            const [metadataAndSteps, lastStep] = await Promise.all([
                generateContentAI(`
                    Generate a french detailed preparation process for "${title}" from "${country}" based on the following ingredients: ${ingredients}. 
                    Each step should be clear and concise and exclude the last step (serving).
                    Please return the response in JSON format like this:
    
                    {
                        "steps": [
                            {
                                "step": 1 (10 minutes),
                                "description": "Peel and chop the vegetables into small pieces.",
                                "tip": "Use a sharp knife to make chopping easier."
                            },
                            {
                                "step": 2 (5 minutes),
                                "description": "Heat oil in a pan over medium heat and sauté the onions until golden.",
                                "tip": "Stir continuously to prevent burning."
                            }
                        ]
                    }
                `),
                generateContentAI(`
                    Generate in french a proverb from ${country} about meal".
                    Please return the response in JSON format like this:
                    {
                        "step": "dégustative",
                        "description": "Bon appétit !",
                        "proverb": "In ${country}, we say lorem ipsum... which means: lorem ipsum..."
                    }
                `)
            ])
            
            const fullRecipe = {
                ...metadataAndSteps,
                steps: [...metadataAndSteps.steps, lastStep]
            };
            
            let formattedContent = ''

            fullRecipe.steps.forEach((step: any) => {
                formattedContent += `<h3>Étape ${step.step}</h3>\n<p>${step.description}</p><p><b>${step.tip ? 'Conseil' : 'Proverbe de fin'}</b> :\n ${step.tip || step.proverb}</p>\n`
            })

            setValue('cookingProcess', formattedContent)
        } catch (error) {
            console.log(error)
            toast.error("Erreur lors de la génération du processus de préparation. Veuillez réessayer plus tard.")
        } finally {
            setLoading({name: 'process', status: false})
        }
    }

    // Handle Submission form
    const onSubmit = async (data: operationMealSchemaType) => {
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, String(value))
            })
            let response;
            if (mode === 'edit' && initialData?.id) {
                formData.append('id', initialData.id)
                response = await updateMeal(initialData.id, formData)
            } else {
                response = await createMeal(formData)
            }


            if (!response?.success) {
                toast.error(response.message);
                return;
            }

            reset()
            setHostedUrl('')
            if (mode === 'create') {
                toast.success(response.message)
            } else {
                toast.success(response.message)
            }
            router.push('/admin/meals')
        } catch (error) {
            console.log(error);
            toast.error("Une erreur est survenue lors de l'ajout de la recette. Veuillez réessayer plus tard.");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl mx-auto'>
            <div className="flex justify-center items-center min-h-screen w-full rounded-md">
                <div className="rounded-lg bg-slate-300 p-4 w-full max-w-md">
                    {/* Recipe image */}
                    <div className="mb-4">
                        <input
                            type="text"
                            hidden
                            {...register('imageUrl')}
                            value={hostedUrl}
                            readOnly
                        />
                        <CldUploadWidget
                            uploadPreset="touristeat_preset"
                            onSuccess={(results) => handleImage(results)}
                            options={{
                                maxFiles: 1,
                                resourceType: 'image',
                                clientAllowedFormats: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
                                maxImageFileSize: 2000000, // 2MB max for image file
                                // Transformation
                                thumbnailTransformation: [
                                    {width: 200, height: 200, crop: 'fill'},
                                    { quality: "auto" },
                                    { fetch_format: "auto" },
                                    { dpr: "auto" }
                                ]
                            }}
                        >
                            {({ open, isLoading }) => (
                                <button
                                    className='bg-white p-1 rounded-lg'
                                    onClick={(e) => {
                                        e.preventDefault()
                                        open()
                                    }}
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? (
                                            <>
                                                <Loader2Icon className='animate-spin pr-1' />
                                                Chargement de l'image...
                                            </>
                                        )
                                        : "Ajouter l'image du plat"
                                    }
                                </button>
                            )}
                        </CldUploadWidget>
                    </div>
                    <div className='mb-4'>
                        {hostedUrl && (
                            <Image src={hostedUrl} alt='image' width={200} height={200} />
                        )}
                    </div>
                    
                    {/* Recipe name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Nom du plat
                        </label>
                        <input
                            type="text"
                            {...register('title')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            aria-describedby="title-error"
                        />
                        {errors.title && (
                            <p className='text-red-500 text-xs mt-1'>
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Country name */}
                    <div className="mb-4">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Pays
                        </label>
                        <select
                            {...register('country')}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Sélectionnez un pays</option>
                            {allCountries.map((country, index) => (
                                <option key={`${country}-${index}`} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                        {errors.country && (
                            <p className='text-red-500 text-xs mt-1'>
                                {errors.country.message}
                            </p>
                        )}
                    </div>

                    {/* Cooking time */}
                    <div className="mb-4">
                        <label htmlFor="cookingTime" className="block text-sm font-medium text-gray-700">
                            Temps de préparation (en min)
                        </label>
                        <input
                            type="number"
                            {...register('cookingTime', {valueAsNumber: true})}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.cookingTime && (
                            <p className='text-red-500 text-xs mt-1'>
                                {errors.cookingTime.message}
                            </p>
                        )}
                    </div>

                    {/* Ingredients content */}
                    <div className="mb-4">
                        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                            Ingrédients nécessaires
                        </label>
                        <button
                            onClick={generateIngredientsContent}
                            className='bg-white p-1 rounded-lg flex'
                            disabled={loading.name === 'ingredients' && loading.status}
                        >
                            {loading.name === 'ingredients' && loading.status
                                ? <Loader2Icon className='animate-spin pr-1' />
                                : <Bot className='pr-1' />
                            }
                            Générer les ingrédients avec l'IA
                        </button>

                        <TipTapEditor
                            name="ingredients"
                            control={control}
                            placeholder="Liste des ingrédients..."
                        />

                        {errors.ingredients && (
                            <p className='text-red-500 text-xs mt-1'>
                                {errors.ingredients.message}
                            </p>
                        )}
                    </div>

                    {/* process content */}
                    <div className="mb-4">
                        <label htmlFor="cookingProcess" className="block text-sm font-medium text-gray-700">
                            Processus de préparation
                        </label>
                        <button
                            onClick={generateProcessContent}
                            className='bg-white p-1 rounded-lg flex'
                            disabled={loading.name === 'process' && loading.status}
                        >
                            {loading.name === 'process' && loading.status
                                ? <Loader2Icon className='animate-spin pr-1' />
                                : <Bot className='pr-1' />
                            }
                            Générer le processus de préparation avec l'IA
                        </button>
                        <TipTapEditor
                            name="cookingProcess"
                            control={control}
                            placeholder='Processus de préparation...'
                        />
                        {errors.cookingProcess && (
                            <p className='text-red-500 text-xs mt-1'>
                                {errors.cookingProcess.message}
                            </p>
                        )}
                    </div>
                    
                    {/* Submit button */}
                    <div className='mb-4'>
                        <button
                            type="submit"
                            className='rounded-xl bg-red-300 font-semibold p-2 mt-3 hover:text-white hover:bg-red-500'
                        >
                            {isSubmitting
                                ? (mode === 'edit' ? 'Modification en cours...' : 'Ajout en cours...')
                                : (mode === 'edit' ? 'Modifier la recette' : 'Ajouter la recette')
                            }
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
