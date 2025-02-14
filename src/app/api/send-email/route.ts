import EmailTemplate from "@/components/ui/email-template";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'
import { ReactElement } from "react";

export async function POST(req:Request) {
    try {
        const {email, username, emailMessage} = await req.json()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        })

        const emailHtml = await render(EmailTemplate({email, username, emailMessage}) as ReactElement)

        await transporter.sendMail({
            from: email,
            to: process.env.GMAIL_USER,
            subject: "Message de Touristeat",
            html: emailHtml
        })

        return NextResponse.json(
            {message: "Email envoyé avec succès"},
            {status: 200}
        )

    } catch (error) {
        console.error("Il y a eu une erreur côté serveur");
        return NextResponse.json(
            {message: "Erreur serveur: ", error},
            {status: 500}
        )
    }
}