'use client'

import { BotMessageSquare } from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Chatbot() {
    const pathname = usePathname()
    // Ne pas afficher le footer sur les routes d'admin
    if (pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <Link href='#' className="chatbot">
          <BotMessageSquare
            style={{ width: '40px', height: '40px' }}
          />
        </Link>
    )
}
