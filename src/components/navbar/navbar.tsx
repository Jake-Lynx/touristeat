'use client'

import React from 'react'
import Logo from './logo'
import HamburgerMenu from './hamburger-menu'
import NavLink from './navlink'
import { usePathname } from 'next/navigation'

const Navbar = () => {
	const pathname = usePathname()
	// Ne pas afficher le footer sur les routes d'admin
	if (pathname.startsWith('/admin')) {
		return null;
	}
	return (
		<nav className="nav">
			<input type="checkbox" id="nav__check" className="nav__check"/>
			<Logo />
			<HamburgerMenu />
			<NavLink />
		</nav>
	)
}

export default Navbar