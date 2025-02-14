'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, ContactSchemaType } from '@/utils/schema'
import toast from 'react-hot-toast'


export default function ContactForm() {

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<ContactSchemaType>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactSchemaType) => {
        try {
            const response = await fetch(
                '/api/send-email', 
                    {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: data.email,
                        username:data.username,
                        emailMessage: data.emailMessage
                    })
                }
            )

            if (response.ok) {
                toast.success("Email, envoyé avec succès")
                reset()
            } else {
                toast.error("Echec avant l'envoi d'email. Veuillez réessayer plus tard")
            }
        } catch (error) {
            console.error("Erreur pendant l'envoi du mail: ", error);
            toast.error("Echec de l'envoi du mail. Veuillez réessayer plus tard.")
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__item">
                {errors.username && (
                    <small className='text-red-500 text-sm'>
                        {errors.username.message}
                    </small>
                )}
                <input
                    {...register('username')}
                    type='text'
                />
                <label htmlFor="name">Votre nom</label>
            </div>

            <div className="form__item">
                {errors.email && (
                    <small className='text-red-500 text-sm'>
                        {errors.email.message}
                    </small>
                )}
                <input
                    type="email"
                    {...register('email')}
                />
                <label htmlFor="email">Votre email</label>
            </div>

            <div className="form__item">
                {errors.emailMessage && (
                    <small className='text-red-500 text-sm'>
                        {errors.emailMessage.message}
                    </small>
                )}
                <textarea
                    {...register('emailMessage')}
                ></textarea>
                <label htmlFor="message">
                    En quoi pouvons-nous vous aider ?
                </label>
            </div>
            <button
                type="submit"
                className="cta form__submit"
            >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer votre message'}
            </button>
        </form>
    )
}
