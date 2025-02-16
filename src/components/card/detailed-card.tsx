import { MealCardProps } from '@/lib/definition';
import Image from 'next/image';
import Link from 'next/link';

export default function DetailedCard(
    {slug, title, imageUrl, country}: MealCardProps
) {
  return (
    <div className="recipe-card">
        <Image
            className="recipe-card__img scale_1-2 object-cover" 
            src={imageUrl} 
            alt={`Plat: ${title}`}
            width={173}
            height={118}
            quality={85}
        />
        <div className="recipe-card__content">
            <p className="recipe-card__details">
                <span className="recipe-card__details-title">
                    {title}
                    <small className='italic'>
                        ({country})
                    </small>
                </span>
            </p>

            <div className="recipe-card__link">
                <Link
                    className="recipe-card__link-1"
                    href="#"
                >
                    <Image
                        src="/icons/icon_share.svg" 
                        alt="Icône de partage"
                        width={24}
                        height={24}
                        style={{ width: 'auto', height: 'auto' }}
                    />
                </Link>

                <Link
                    className="recipe-card__link-2" 
                    href={`/recipe/${slug}`}
                >
                    <Image
                        src="/icons/icon_right-maroon.svg"
                        alt="Icône en savoir plus"
                        width={24}
                        height={24}
                        style={{ width: 'auto', height: 'auto' }}
                    />
                </Link>
            </div>
        </div>
    </div>
  )
}
