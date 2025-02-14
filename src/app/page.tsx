// Actions & other lib
import { Suspense } from "react";

// Components
import HeroHome from "@/components/hero/hero-home";
import ShowMeal from "@/components/ui/show-meal"
import { SkeletonMealCard } from "@/components/skeleton/skeleton-meal-card";

// Next
import Image from "next/image";
import Link from "next/link";


export default function Home() {

  return (
    <>
      {/* Hero image */}
      <section className="home-hero">
        <HeroHome />

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
            style={{ width: 'auto', height: 'auto' }}
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
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>
        <Suspense fallback={<SkeletonMealCard />}>
          <ShowMeal card="simple" />
        </Suspense>
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
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </div>
      </section>

      {/* Plats les plus appréciés */}
      <section className="home-like above-xs">
        <h3 className="home-like__title">Les plats les plus appréciés</h3>
        <Suspense fallback={<SkeletonMealCard />}>
          <ShowMeal card="chief" />
        </Suspense>
      </section>
    </>
  );
}
