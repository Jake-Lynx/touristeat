
type NavLinksProps = {
    href: string;
    label: string;
    imagePath: string;
}

const pathPrefix = (name: string) => {
    return `/icons/icon_${name}.svg`
}


export const links: NavLinksProps[] = [
    {
        href: '/',
        label: 'Accueil',
        imagePath: pathPrefix('cake')
    },
    {
        href: '/discover',
        label: 'Découverte',
        imagePath: pathPrefix('food')
    },
    {
        href: '/recipe',
        label: 'Recettes',
        imagePath: pathPrefix('pizza')
        
    },
    {
        href: '/contact',
        label: 'Contact',
        imagePath: pathPrefix('hamburger')
    },
    {
        href: '/admin',
        label: 'admin',
        imagePath: pathPrefix('cake')
    },
]