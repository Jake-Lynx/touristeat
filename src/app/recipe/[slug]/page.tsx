import HeroSpecificMeal from "@/components/hero/hero-specific-meal";
import DisplayContent from "@/components/ui/display-content";
import { getMealBySlug } from "@/actions/meals";
import Image from "next/image";
import Link from "next/link";
import SkeletonRecipePage from "@/components/skeleton/skeleton-recipe";
import { Suspense } from "react";
import MealContent from "./meal-content";

export default async function DisheRecipe(
    {params}: {params: Promise<{slug: string}>}
) {
    const slug = (await params).slug;

    return (
        <Suspense fallback={<SkeletonRecipePage />}>
            <MealContent slug={slug} />
        </Suspense>
    )
}
