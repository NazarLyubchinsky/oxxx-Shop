import { Link } from 'react-router-dom'
import { detectShop } from '../../utils/shopDetect'

const logoR3 = '/images/r3.jpg'
const logoAngar = '/images/angar.jpg'

const Logo = () => {
	const shop = detectShop()
	const src = shop === 'angar' ? logoAngar : logoR3
	const alt = shop === 'angar' ? 'Angar logo' : 'R3 logo'

	// When clicking the logo we want to go to the site's root '/',
	// but preserve the current shop for rendering the logo on the root page.
	const handleClick = () => {
		try { window.localStorage.setItem('LAST_SHOP', shop) } catch (e) {}
	}

	return (
		<div className='logo'>
			<Link to='/' onClick={handleClick}>
				<img src={src} alt={alt} />
			</Link>
		</div>
	)
}

export default Logo

