import { MealCardProps } from '@/lib/definition';
import Image from 'next/image';


const SimpleMealCard = (
  {title, imageUrl, className}: MealCardProps
) => {
  return (
    <div className={`home-card ${className}`}>
        <Image
            className="home-card__img scale_1-2"
            src={imageUrl}
            alt={`Plat: ${title}`}
            width={173}
            height={118}
        />
        <p className="home-card__title">
            {title}
        </p>
    </div>
  )
}

export default SimpleMealCard