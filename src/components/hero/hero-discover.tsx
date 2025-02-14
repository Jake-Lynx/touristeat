import React from 'react'
import Image from 'next/image';

export default function HeroDiscover() {
    return (
        <section className="discovery-hero">
            <h1 className="discovery-hero__title">Les meilleurs délices de la planète</h1>
            <div className="above-xs discovery-hero__layer"></div>
            <div className="discovery-hero__map show-bg_map above-xs"></div>
            <Image
                className="discovery-hero__image show-header_image above-xs"
                src="/images/header_cake.png" 
                alt="Gâteau"
                width={566}
                height={298}
            />
        </section>
    )
}
