import Image from 'next/image';

export default function HeroRecipe() {
    return (
        <section className="recipe-hero">
            <div className="recipe-hero__main-section">
                <h1 className="recipe-hero__title">
                    Choisissez votre menu du jour
                </h1>
                <Image
                    className="recipe-hero__image fade-in above-xs"
                    src="/images/header_cake-recipe.png"
                    alt="Gâteau"
                    width={691}
                    height={378}
                />
                <Image
                    className="recipe-hero__image only-xs" 
                    src="/images/pavlova.png" 
                    alt="Gâteau"
                    width={390}
                    height={261}
                />
            </div>               
        </section>
    )
}
