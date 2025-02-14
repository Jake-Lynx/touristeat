import { advantages } from '@/utils/icons'
import Image from 'next/image'
import React from 'react'

const Advantages = () => {
  return (
    <>
    {advantages.map((advantage, index) => (
        <p
            key={`${advantage.iconName}-${index}`} 
            className="home-hero__value-item"
        >
            <Image
                src={advantage.iconPath}
                alt={advantage.alt}
                className="home-hero__value-icon"
                width={43}
                height={43}
            />
            <span className="home-hero__value-title">
                {advantage.iconName}
            </span>
        </p>
    ))}
    </>
  )
}

export default Advantages