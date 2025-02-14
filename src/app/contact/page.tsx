'use client'

import ContactForm from "@/components/form/contact-form";
import HeroContact from "@/components/hero/hero-contact";
import Image from 'next/image';
import { Suspense } from "react";

export default function Contact() {

    return (
        <>
            {/* Hero section */}
            <HeroContact />

            {/* Contact form */}
            <section className="contact-container">
                <Suspense fallback={<p>Chargement...</p>}>
                    <ContactForm />
                </Suspense>
                <Image
                    src="/images/cocktail.png"
                    alt="Cocktail à la fraise"
                    width={500}
                    height={500}
                    className="contact-container__image fade-in"
                    style={{ width: 'auto', height: 'auto' }}
                />
            </section>
        </>
    )
}
