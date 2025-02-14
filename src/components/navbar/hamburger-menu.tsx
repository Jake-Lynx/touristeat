import Image from 'next/image'

const HamburgerMenu = () => {
  return (
    <div className="nav__btn">
			<label htmlFor="nav__check" className="nav__icon">
        <Image
          src='/icons/icon-menu.svg'
          alt="Logo Touristeat"
          width={21}
          height={21}
          className="nav__btn-logo"
        />
			</label>
		</div>
  )
}

export default HamburgerMenu