'use client'

import toast from "react-hot-toast"
import { deleteMeal } from "@/actions/meals"
import { useRouter } from "next/navigation"


export function DeleteMealButton({ id }: { id: string }) {
    const router = useRouter()

    const handleClick = async () => {
        const response = await deleteMeal(id)

        if (response?.success) {
            toast.success(response.message)
        } else {
            toast.error(response.message)            
        }
        router.push('/admin/meals')
    }

    return (
        <button
            onClick={handleClick}
        >
            Supprimer la recette
        </button>
    )
}