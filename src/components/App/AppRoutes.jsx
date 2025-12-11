

import { Route, Routes } from 'react-router-dom'
import Cart from '../../pages/Cart/Cart'
import NewsPage from '../../pages/News/NewsPage'
import NewsSingle from '../../pages/News/NewsSingle'
import NotFound from '../../pages/NotFound/NotFound'
import ShopPage from '../../pages/Shop/ShopPage'
import TourPage from '../../pages/Tour/TourPage'
import Home from '../Home/Home'
import Product from '../Product/Product'
import Tic from '../Tic/Tic'

const AppRoutes = () => {

	return (
		<>
			<Routes>
				
				<Route index element={<Home />} />
				<Route path='/tour' element={<TourPage />} />
				<Route path='/shop' element={<ShopPage />} />
				<Route path='/shop/:size' element={<ShopPage />} />
                <Route path='/shop/:size/:pcd' element={<ShopPage />} />
              


               <Route path='/shop/product/:id' element={<Product />} />

				<Route path='/news' element={<NewsPage />} />
				<Route path='/cart' element={<Cart />} />
				<Route path='/news/:id' element={<NewsSingle />} />
				<Route path='*' element={<NotFound />} />



				<Route path='/tic' element={<Tic />} />
			</Routes>


		</>
	)
}

export default AppRoutes