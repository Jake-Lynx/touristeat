'use client'

// Lib
import { links } from "@/utils/links"
import clsx from "clsx"

// Next
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavLink = () => {

    const pathname = usePathname()    
    
    return (
        <div className="nav__list">
            {
                links.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={clsx(
                            'nav__item',
                            {
                                'nav__item--active': item.href === pathname
                            }
                        )}
                    >
                        <Image
                            src={item.imagePath}
                            alt={`${item.label} nav icon`}
                            className="nav__item-icon"
                            width={24}
                            height={24}
                        />
                        <span
                            className="nav__item-text"
                        >
                            {item.label}
                        </span>
                    </Link>
                ))
            }
        </div>
    )
}

export default NavLink