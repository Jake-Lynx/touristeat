'use client'

import Image from 'next/image';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


export default function HeroSpecificMeal(
    {title, country, imageUrl}: {title: string, country: string, imageUrl: string}
) {
    return (
        <section className="specific-recipe-hero">
            {/* Breadcrumb */}
            <Breadcrumb className='pt-5'>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/recipe">Recettes</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {title} ({country})
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="specific-recipe-hero__main-section">
                <Image
                    className="specific-recipe-hero__image fade-in"
                    src={`${imageUrl}`}
                    alt={`Plat: ${title}`}
                    width={400}
                    height={400}
                    style={{ width: 'auto', height: 'auto' }}
                />
                <div className="specific-recipe-hero__social">
                    <Link 
                        className="specific-recipe-hero__social-item"
                        href="#"
                    >
                        <Image
                            className="specific-recipe-hero__social-icon"
                            src="/icons/icon_facebook-maroon.svg"
                            alt="Icône Facebook"
                            width={24}
                            height={24}
                        />
                        <span 
                            className="specific-recipe-hero__social-link"
                        >
                            facebook/touristeat
                        </span>
                    </Link>
                    <Link 
                        className="specific-recipe-hero__social-item"
                        href="#"
                    >
                        <Image
                            className="specific-recipe-hero__social-icon"
                            src="/icons/icon_twitter-maroon.svg"
                            alt="Icône Twitter"
                            width={24}
                            height={24}
                        />
                        <span 
                            className="specific-recipe-hero__social-link"
                        >
                            twitter/touristeat
                        </span>
                    </Link>
                    <Link 
                        className="specific-recipe-hero__social-item"
                        href="#"
                    >
                        <Image
                            className="specific-recipe-hero__social-icon"
                            src="/icons/icon_snapchat-maroon.svg"
                            alt="Icône Snapchat"
                            width={24}
                            height={24}
                        />
                        <span   
                            className="specific-recipe-hero__social-link"
                        >
                            snapchat/touristeat
                        </span>
                    </Link>
                    <Link 
                        className="specific-recipe-hero__social-item"
                        href="#"
                    >
                        <Image
                            className="specific-recipe-hero__social-icon"
                            src="/icons/icon_instagram-maroon.svg"
                            alt="Icône Instagram"
                            width={24}
                            height={24}
                        />
                        <span 
                            className="specific-recipe-hero__social-link"
                        >
                            instagram/touristeat
                        </span>
                    </Link>
                </div>
            </div>
            <h1 className="specific-recipe-hero__title text-center">
                {title}
            </h1>
        </section>
    );
}
