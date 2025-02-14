import { socialIcons } from "@/utils/icons"
import Image from "next/image"
import Link from "next/link"


const SocialIcon = () => {
    return (
        <div className="flex">
            {socialIcons.map((icon) => (
                <Link
                    key={icon.iconName}
                    href='/'
                    className="footer__social"
                >
                    <Image
                        src={icon.iconPath}
                        alt={icon.alt}
                        width={24}
                        height={24}
                        className="footer__social-icon"
                    />
                </Link>
            ))}
        </div>
    )
}

export default SocialIcon