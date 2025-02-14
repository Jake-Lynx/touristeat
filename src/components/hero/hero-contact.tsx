import Image from "next/image"

export default function HeroContact() {
    return (
        <section className="contact-hero">
            <h1 className="contact-hero__title">
                Laissez-nous un mot
            </h1>
            <Image
                className="contact-hero__image fade-in" 
                src="/images/contact_cake.png" 
                alt="Gâteau au chocolat"
                width={300}
                height={300}
            />
        </section>
    )
}
