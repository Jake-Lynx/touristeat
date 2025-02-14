import HeroMeal from "@/components/hero/hero-meal";
import ChiefCard from "@/components/card/chief-card"
import SimpleCard from "@/components/card/simple-card"
import Advantages from "@/components/ui/advantages";
import { getMeals } from "@/actions/meals";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  const meals = await getMeals()

  return (
    <>
      {/* Hero image */}
      <section className="home-hero">
        <div className="home-hero__main-section">
          <div className="home-hero__value only-md">
            <Advantages />
          </div>
          <h1 className="home-hero__title">
            Que mange-t-on aujourd'hui ?
          </h1>
          <HeroMeal
            className="only-xl"
            imagePath="/images/header_roast.png"
            alt="Poulet rôti"
          />
          <HeroMeal
            className="only-md"
            imagePath="/images/header_pizza.png"
            alt="Pizza"
          />
          <HeroMeal
            className="only-xs"
            imagePath="/images/hamburger-giant.png"
            alt="Hamburger"
          />
          <div className="home-hero__value only-xl">
            <Advantages />
          </div>
        </div>

        <Link
          href='/recettes'
          className="cta show-up"
        >
          Découvrir une nouvelle recette
        </Link>
      </section>

      {/* A propos */}
      <section className="home-about">
        <h2>Que des délices dans votre cuisine</h2>
        <p className="home-about__description">
          Grâce à "Touristeat", restez chez vous tout en profitant des merveilles qui se cuisinent aux quatre coins du monde."Nous réunissons avec amour les meilleurs plats de plusieurs pays de différents continents." Désormais, mangez italien, africain, chinois, russe ou ce que vous souhaitez quand vous en avez envie.
          <span className="mt-1">
            De plus, chaque semaine, nous ajoutons de nouvelles recettes, histoire de ravir vos papilles !
          </span>
        </p>
      </section>

      {/* Les plats */}
      <section className="home-recipe">
        <div className="home-recipe__intro">
          <Image
            className="home-recipe__intro-left move-x-infinite" 
            alt="Fromage"
            src="/images/cheese.png"
            width={80}
            height={70}
          />
          <h2 className="home-recipe__intro-title">
            Goûtez aux recettes du monde entier
          </h2>
          <Image
            className="home-recipe__intro-right move-y-infinite" 
            alt="Grappe de tomage"
            src="/images/tomato.png"
            width={94}
            height={72}
          />
        </div>
        <div className="home-recipe__list">
          {meals.slice(0,4)?.map((meal, index) => {
            let customClass = ''
            if (index === 2) {
              customClass = 'above-xs'
            } else if (index === 3) {
              customClass = 'only-xl'
            }

            return (
              <SimpleCard
                key={meal.id}
                id={meal.id}
                title={meal.title}
                imageUrl={meal.imageUrl}
                className={customClass}
              />
            )
          })}
        </div>
        <a className="cta" href="discovery.html">Voir plus de recettes</a>
      </section>

      {/* Plat du jour */}
      <section className="home-daily">
        <h3 className="home-daily__title">
          Plat du jour
        </h3>
        <div className="home-daily__content">
          <div className="home-daily__description above-xs">
            <p className="home-daily__text">
              La paella est un plat de riz traditionnel espagnol originaire de la région de Valence. Bien qu'il existe de nombreuses variantes, la plus célèbre est la paella valencienne, à base de poulet, de lapin et de légumes.
            </p>
            <Link
              className="cta"
              href="/recipe"
            >
              Préparer ce plat
            </Link>
          </div>
          <div className="home-daily__illustration">
            <Link
              className="cta only-xs mt-3" 
              href="/recipe"
            >
              Préparer ce plat
            </Link>
            <h3>Paella</h3>
            <Image
              className="filter-image" 
              alt="Plat jour"
              src="/images/paella.png"
              width={194}
              height={176}
            />
          </div>
        </div>
      </section>

      {/* Plats les plus appréciés */}
      <section className="home-like above-xs">
        <h3 className="home-like__title">Les plats les plus appréciés</h3>
        <div className="home-like__list">
          {meals?.slice(3, 7).map((meal, index) => {
            const customClass = index === 3 ? 'only-xl' : ''

            return (
              <ChiefCard
                key={meal.id}
                title={meal.title}
                imageUrl={meal.imageUrl}
                country={meal.country}
                className={customClass}
              />
            )
          })}
        </div>
      </section>
    </>
  );
}
