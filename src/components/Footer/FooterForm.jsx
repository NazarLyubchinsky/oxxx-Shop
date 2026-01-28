import '../../styles/footer.scss'
import { detectShop } from '../../utils/shopDetect'

const FooterForm = () => {
	const shop = detectShop()

	const links = {
		r3: {
			instagram: 'https://www.instagram.com/r3.autocenter/',
			tiktok: 'https://www.tiktok.com/@r3_autocenter'
		},
		angar: {
			instagram: 'https://www.instagram.com/avto.angar_/',
			tiktok: 'https://www.tiktok.com/@avtoangar'
		}
	}

	const currentLinks = links[shop] || links.r3

	return (
		<div className='footer-form'>
			<div className='footer-form__container'>
				<div className='footer-form__links'>
					<a
						href={currentLinks.instagram}
						target='_blank'
						rel='noopener noreferrer'
						className='footer-form__link footer-form__link--instagram'
						aria-label='Instagram'
					>
						<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
							<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.25-.148-4.768-1.693-4.917-4.919-.058-1.265-.07-1.645-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z' />
						</svg>
						Instagram
					</a>
					<a
						href={currentLinks.tiktok}
						target='_blank'
						rel='noopener noreferrer'
						className='footer-form__link footer-form__link--tiktok'
						aria-label='TikTok'
					>
						<svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
							<path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.75 2.9 2.9 0 0 1 2.31-4.64 2.9 2.9 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.08A6.9 6.9 0 0 0 5 20.1a6.9 6.9 0 0 0 10.53-5.4V9.4a8.7 8.7 0 0 0 5.06 1.69v-3.4a4.26 4.26 0 0 1-.41-.04z' />
						</svg>
						TikTok
					</a>
				</div>
			</div>
		</div>
	)
}

export default FooterForm
