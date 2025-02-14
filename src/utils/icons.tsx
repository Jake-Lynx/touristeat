import { iconProps } from "@/lib/definition"


const socialPrefix = (social: string) => {
    return `/icons/icon_${social}-white.svg`
}

const advanPrefix = (item: string) => {
    return `/icons/icon_${item}.svg`
}


export const socialIcons : iconProps[] = [
    {
        iconName: 'instagram',
        alt: 'Lien Instagram',
        iconPath: socialPrefix('instagram')
    },
    {
        iconName: 'youtube',
        alt: 'Lien Youtube',
        iconPath: socialPrefix('youtube')
    },
    {
        iconName: 'linkedin',
        alt: 'Lien LinkedIn',
        iconPath: socialPrefix('linkedin')
    },
    {
        iconName: 'snapchat',
        alt: 'Lien snapchat',
        iconPath: socialPrefix('snapchat')
    },
    {
        iconName: 'x',
        alt: 'Lien ver X',
        iconPath: socialPrefix('twitter')
    },
    {
        iconName: 'facebook',
        alt: 'Lien Facebook',
        iconPath: socialPrefix('facebook')
    }
]

export const advantages: iconProps[] = [
    {
        iconName: 'Des recettes faciles',
        alt: 'Icône de temps',
        iconPath: advanPrefix('stopwatch')
    },
    {
        iconName: 'Devenez cordon bleu',
        alt: 'Icône Nourriture',
        iconPath: advanPrefix('meal')
    },
    {
        iconName: 'Du bonheur entre proches',
        alt: 'Icône groupe',
        iconPath: advanPrefix('family')
    },
]