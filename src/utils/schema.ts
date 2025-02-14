import z from 'zod'

// Contact form types
export const contactSchema = z.object({
    username: z.string().min(1, "Veuillez entrer votre nom"),
    email: z.string().email("Veuillez entrer une adresse email valide"),
    emailMessage: z.string().min(1, "Veuillez entrer un message")
})

export type ContactSchemaType = z.infer<typeof contactSchema>


// Meal form types
export const mealSchema = z.object({
    id: z.string(),
    title: z.string().min(3, {message: 'Le nom du plat doit contenir au moins 3 caractères'}),
    country: z.string().min(1, {message: 'Veuillez choisir un pays'}),
    imageUrl: z.string().url({message: 'Veuillez fournir une URL valide'}),
    ingredients: z.string().min(1, {message: 'Veuillez mentionner les ingrédients nécessaires'}),
    cookingProcess: z.string().min(10, {message: 'Quel est le processus de préparation ?'}),
    cookingTime: z.coerce.number().positive({message: 'Veuillez indiquer le temps de préparation'}),
})

export type mealSchemaType = z.infer<typeof mealSchema>

export const operationMealSchema = mealSchema.omit({id: true})
export type operationMealSchemaType = z.infer<typeof operationMealSchema>
