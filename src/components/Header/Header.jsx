import { NavLink } from 'react-router-dom'

// scroll menu-item
import ScrollAnimation from 'react-animate-on-scroll'

//constants
import { MENU } from '../../utils/constants'

//component
import Logo from '../Logo/Logo'
import Hamburger from './Hamburger'
import { detectShop, getShopPrefix } from '../../utils/shopDetect'

const Header = () => {
	const shop = detectShop()
	const phone = shop === 'angar' ? '096 03 09 009' : '098 130 30 33'

	// redux
	// const cart = useSelector((state) => state.cart.cart)

	// const getTotalQuantity = () => {
	// 	let total = 0
	// 	cart.forEach(item => {
	// 		total += item.quantity
	// 	})
	// 	return total
	// }
	return (
		<section className='header'>
				<header>
					<div style={{
						display: 'flex', gap: ' 10px', alignItems: 'center'
					}}>
						<Hamburger />
						<Logo />
					</div>
					<nav className='menu'>
						{
							MENU.map(({ link, name }, i) =>
								<ScrollAnimation key={link}
									className="menu-item"
									animateIn="fadeInDown"
									delay={i * 100}
									offset={0}>
									{(() => {
										const prefix = getShopPrefix()
										const to = `${prefix}/${link}`
										return (
											<NavLink className={({ isActive }) => (isActive ? "active" : '')} to={to}>
												{name}
											</NavLink>
										)
									})()}
								</ScrollAnimation>
							)
						}
					</nav>

					
					{/* <Link to='/cart' className='header__block-cart'> */}
						{/* <BsCart2 size={18} /> */}
						{/* <small>{getTotalQuantity() || 0}</small> */}
					{/* </Link> */}
					<div>
						<span style={{color:"grey"}}>+38  </span>
                        <span>{phone}</span>
					</div>
				</header>
		</section >
	)
}

export default Header