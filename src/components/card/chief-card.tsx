import { MealCardProps } from '@/lib/definition'
import Image from 'next/image'
import Link from 'next/link'

type MealChiefIconProps = MealCardProps

export default function ChiefCard(
    {title, country, imageUrl, className}: MealChiefIconProps
) {
    return (
        <div
            className={`discovery-card ${className}`}
        >
            <Image
                className="discovery-card__img scale_1-2" 
                src={imageUrl}
                alt={`Plat: ${title}`}
                width={173}
                height={118}
            />
            <div className="discovery-card__content">
                <p className="discovery-card__details">
                    <span 
                        className="discovery-card__details-title"
                    >
                        {title}
                    </span><br />
                    <span
                        className="discovery-card__details-country"
                    >
                        {country}
                    </span>
                </p>
                <Link
                    className="discovery-card__link" 
                    href="/recipe"
                >
                    <Image
                        src="/icons/icon_cook-mobile.svg"
                        alt={`Découvrir la recette de ${title}`}
                        width={30}
                        height={30}
                    />
                </Link>
            </div>
        </div>   
    )
}
