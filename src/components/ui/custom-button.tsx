'use client'

import toast from "react-hot-toast"
import { deleteMeal } from "@/actions/meals"

export function DeleteMealButton({ id }: { id: string }) {

    const handleClick = async () => {
        const response = await deleteMeal(id)

        if (response.message) {
            toast.success('Plat supprimé avec succès')
        } else {
            toast.error('Echec de la suppression du plat')            
        }
    }

    return (
        <button
            onClick={handleClick}
        >
            Supprimer la recette
        </button>
    )
}