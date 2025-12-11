// images
import Logo from "../Logo/Logo";
import Socials from "../Socials/Socials";

// components
import FooterForm from './FooterForm'

const Footer = () => {
	return (
		<footer className='footer'>
			<div className="container">
				<div className="footer__wrapper">

					<FooterForm />
					<div className="footer__wrapper-block">
						<div className="footer-info">
							<div className="footer-info__logo">
								<Logo />
							</div>
							
						</div>

						<Socials width={22} height={22} />
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer