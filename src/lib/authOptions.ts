import prisma from '@/lib/prisma'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async jwt({token, account, profile}) {
            // Check if user exists and 
            if (account && profile && !token.id) {
                let user = await prisma.user.findUnique({
                    where: {
                        email: profile.email!
                    }
                })                
                
                // Si l'utilisateur n'existe pas
                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email: profile.email!,
                            username: profile.name ?? profile.email!,
                            avatar: token.picture ?? '',
                            role: 'user'
                        }
                    })
                }
                
                // Save user data in token
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.avatar = token.picture;
                token.role = user.role;                
            }

            return token
        },
        async session({ session, token }) {
            session.user.id = token.id as string
            session.user.email = token.email as string
            session.user.username = token.username as string
            session.user.avatar = token.avatar as string
            session.user.role = token.role as string
            
            return session;
        },
    },
    session: {
        strategy: 'jwt'
    }
}