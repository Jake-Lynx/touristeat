'use client'
import { Heart } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import Link from "next/link"

export default function Dashboard() {
    const {data: session} = useSession()

    if (!session) return (
        <div className="bg-gradient-to-b from-pink-300 to-red-500 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl bg-blue-100 p-8 rounded-lg shadow-lg relative">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-gray-800">Bienvenue sur l'espace admin de Touristeat</h1>
                    <p className="text-gray-700 mt-4">
                        Vous pourrez visualiser et éditer les différentes recettes
                    </p>
                    <button
                        onClick={() => signIn('google')}
                        className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700"
                    >
                        Connectez-vous
                    </button>
                </div>
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <div>Made with <Heart width={16} height={16} className="mx-auto" /> by <span className="font-bold">Touristeat</span></div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="bg-gradient-to-b from-pink-300 to-red-500 min-h-screen">
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-4xl bg-blue-100 p-8 rounded-lg shadow-lg relative">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-gray-800">
                            Ravi de vous revoir !
                        </h1>
                        <Link
                            href="/admin/meals"
                            className="mt-6 inline-block px-6 py-2 bg-red-400 text-white rounded-lg shadow-md hover:bg-red-500"
                        >
                            Accéder aux recettes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
