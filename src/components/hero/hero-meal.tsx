import Image from 'next/image';

type HeroMealProps = {
    className: string;
    alt: string;
    imagePath: string;
}

const HeroMeal = (
    { className, imagePath, alt }: HeroMealProps
) => {
  return (
    <section className={`home-hero__meal ${className}`}>
        <div className="home-hero__layer"></div>
        <Image
            className="home-hero__image fade-in"
            src={imagePath} alt={alt}
            width={488}
            height={432}
        />
    </section>
  )
}

export default HeroMeal