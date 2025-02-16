import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="nav__header">
       <Link href='/'>
           <Image
               src='/logo.svg'
               alt="app logo"
               className="nav__header-logo"
               width={40}
               height={40}
               priority={true}
            />
       </Link>
    </div>
  )
}
