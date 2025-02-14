'use client'

import Logo from "@/components/navbar/logo"
import { CirclePowerIcon, CircleUserIcon, PowerIcon } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"

export default function AdminNavbar() {
    const {data: session} = useSession()

    if (!session) {
        return (
            <div>
                <nav className="bg-gradient-to-r from-pink-300 to-red-500 p-4 shadow-md h-16">
                    <div className="mx-auto flex justify-between items-center">
                        <Logo/>
                        <div className="flex items-center space-x-4">
                            <span className="text-white font-medium">Invité</span>
                            <CircleUserIcon width={25} height={25} className="text-white"/>
                            <button
                                onClick={() => signIn('google')}
                            >
                                <PowerIcon
                                    width={25}
                                    height={25}
                                    className="text-white hover:text-slate-500"
                                />
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }

    return (
        <nav className="bg-gradient-to-t from-red-300 to-red-400 p-4 shadow-md h-16">
            <div className="mx-auto flex justify-between items-center">
                <Logo/>
                <div className="flex items-center space-x-4">
                    <span className="text-white font-semibold italic">
                        {session.user?.username}
                    </span>
                    {session.user?.avatar && (
                        <Image
                            src={session.user?.avatar}
                            alt="Photo de profil du compte"
                            width={25}
                            height={25}
                            className="rounded-full flex items-center justify-center"
                        />
                    )}
                    <button
                        onClick={() => signOut({callbackUrl: '/admin'})}
                    >
                        <CirclePowerIcon
                            width={25}
                            height={25}
                            className="text-white hover:text-slate-500"
                        />
                    </button>
                </div>
            </div>
        </nav>
    )
}
