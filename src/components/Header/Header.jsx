import React from 'react'
import { Link, NavLink } from 'react-router-dom'

// scroll menu-item
import ScrollAnimation from 'react-animate-on-scroll'
import { BsCart2 } from 'react-icons/bs';


//constants
import { MENU } from '../../utils/constants'

//component
import Logo from '../Logo/Logo'
import Socials from '../Socials/Socials'
import Hamburger from './Hamburger'

// redux
import { useSelector } from 'react-redux';

const Header = () => {

	// redux
	const cart = useSelector((state) => state.cart.cart)

	const getTotalQuantity = () => {
		let total = 0
		cart.forEach(item => {
			total += item.quantity
		})
		return total
	}
	return (
		<section className='header'>
			<div className="container">
				<header>
					<Logo />
					<nav className='menu'>
						{
							MENU.map(({ link, name }, i) =>
								<ScrollAnimation key={link}
									className="menu-item"
									animateIn="fadeInDown"
									delay={i * 100}
									offset={0}>
									<NavLink className={({ isActive }) => (isActive ? "active" : '')} to={`/${link}`}>
										{name}
									</NavLink>
								</ScrollAnimation>
							)
						}
					</nav>
					<div className='header__block'>
						<Socials />
						<Hamburger />
						<Link to='/cart' className='header__block-cart'>
							<BsCart2 size={18} />
							<small>{getTotalQuantity() || 0}</small>
						</Link>
					</div>

				</header>
			</div>
		</section>
	)
}

export default Header