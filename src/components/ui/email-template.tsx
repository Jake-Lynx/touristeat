import * as React from 'react'
import {Html, Head, Preview, Body, Container, Heading, Text} from '@react-email/components'
import { EmailTemplateProps } from '@/lib/definition'


const EmailTemplate = (
    {email, username, emailMessage}: EmailTemplateProps
) => {
    return (
        <Html>
            <Head />
            <Preview>Demande de Contact</Preview>
            <Body className="bg-gray-100 p-5">
                <Container
                    className="bg-white p-5 rounded-lg shadow-md max-w-xl mx-auto text-center"
                >
                    <Heading
                        className="text-gray-800 text-center text-2xl font-bold"
                    >
                        Demande de Contact
                    </Heading>
                    <Text
                        className="text-gray-600"
                    >
                        Hello, je suis <strong>{username}</strong>,
                    </Text>
                    <Text
                        className="bg-gray-200 p-3 border-l-4 border-blue-600 text-gray-700"
                    >
                        {emailMessage}
                    </Text>
                    <Text className="text-gray-600">
                        Dans l’attente de votre retour, 
                        mon mail est : {email}
                    </Text>
                    <Text
                        className="text-white text-sm text-center mt-5 bg-red-500 font-semibold"
                    >
                        Cordialement, <br /> Votre équipe
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}
export default EmailTemplate