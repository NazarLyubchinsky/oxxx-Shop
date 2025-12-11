import { Link } from 'react-router-dom'

import logo from '../../images/0-02-05-2ea2b8646444959a9191c5feec65ae5a543694a138425375e851378babbf180d_f52cd4cd5a29a098.jpg'

const Logo = () => {
	return (
		<div className='logo'>
			<Link to='/'>
				<img src={logo} alt="logo" />
			</Link>
		</div>
	)
}

export default Logo

