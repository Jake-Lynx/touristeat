'use client'

import Image from "next/image"
import SocialIcon from "./social-icon"
import Link from "next/link"
import  {CircleArrowRight, CircleUserRound} from 'lucide-react'
import { usePathname } from "next/navigation"

const Footer = () => {

    const pathname = usePathname()
    // Ne pas afficher le footer sur les routes d'admin
    if (pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <footer className="footer">
            <div className="footer__list">
                <Image
                    src='/logo.svg'
                    alt="App logo"
                    className="footer__logo"
                    width={150}
                    height={40}
                />
            </div>
            <div className="footer__list above-xl">
                <Link
                    className="footer__item" 
                    href="/recipe"
                >
                    Consultez nos dernières recettes
                </Link>
                <Link
                    className="footer__item" 
                    href="/contact"
                >
                    Contactez-nous
                </Link>
            </div>
            <div className="footer__list">
                <div className="footer__newsletter">
                    <CircleArrowRight
                        className="footer__newsletter-icon w-20 h20 mr-5"
                    />
                    <input className="footer__item footer__newsletter-input" type="email" placeholder="Recevez les dernières actualités" />
                </div>
                <p className="footer__item copyright">
                    <span className="label">&copy; Copyright - Touristeat 2025</span>
                </p>
            </div>
            <div className="footer__list">
                <Link
                    className="footer__item align-middle" 
                    href="/admin"
                >
                    <CircleUserRound
                        className="credits-icon"
                        style={{width: "16px", height: "16px"}}
                    />
                    <span className="label">
                        Admin
                    </span>
                </Link>
                <SocialIcon />
            </div>
        </footer>
    )
}

export default Footer