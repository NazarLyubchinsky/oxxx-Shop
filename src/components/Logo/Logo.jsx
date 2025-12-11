import { Link } from 'react-router-dom'
import { detectShop } from '../../utils/shopDetect'

const logoR3 = '/images/r3.jpg'
const logoAngar = '/images/angar.jpg'

const Logo = () => {
	const shop = detectShop()
	const src = shop === 'angar' ? logoAngar : logoR3
	const alt = shop === 'angar' ? 'Angar logo' : 'R3 logo'

	return (
		<div className='logo'>
			<Link to='/' >
				<img src={src} alt={alt} />
			</Link>
		</div>
	)
}

export default Logo

