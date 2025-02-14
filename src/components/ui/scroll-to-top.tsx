'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CircleArrowUp } from 'lucide-react';

export default function ScrollToTop() {
    const pathname = usePathname()
    // Ne pas afficher le footer sur les routes d'admin
    if (pathname.startsWith('/admin')) {
        return null;
    }
    return (
        <Link href='#top' className="scroll-top">
          <CircleArrowUp
            style={{ width: '40px', height: '40px' }}
          />
        </Link>
    )
}
