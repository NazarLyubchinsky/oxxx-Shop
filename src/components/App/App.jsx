import React, { Suspense } from 'react'
import '../../styles/index.scss'


// components
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import AppRoutes from './AppRoutes'
import Preloader from '../Preloader/Preloader'
import { useLocation } from 'react-router-dom'

const App = () => {
	const location = useLocation()
	return (
		<Suspense fallback={<Preloader />} className='app'>
			<Header />
			<AppRoutes />
			{
				location.key === 'default' ?  '' : <Footer />
			}
			
		</Suspense>
		
	)
}

export default App