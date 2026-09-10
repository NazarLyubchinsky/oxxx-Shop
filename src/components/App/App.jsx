import React, { Suspense,  } from 'react'
import '../../styles/index.scss'


// components
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import AppRoutes from './AppRoutes'
import Preloader from '../Preloader/Preloader'
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton'
import { useLocation } from 'react-router-dom'

const App = () => {
	const location = useLocation()

	

	

	return (
		<Suspense fallback={<Preloader />} className='app'>
			<Header />
			<AppRoutes />
			<ScrollToTopButton />
			{
				location.key === 'default' ?  '' : <Footer />
			}
			
		</Suspense>
		
	)
}

export default App