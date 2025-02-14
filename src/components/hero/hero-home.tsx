// Components
import HeroMeal from './hero-meal'
import Advantages from '../ui/advantages'


export default function HeroHome() {
    return (
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
    )
}

