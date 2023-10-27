import React from 'react'
import News from '../News/News'
// components
import TourItems from '../Tour/TourItems'
import Tracks from '../Tracks/Tracks'
import MainBanner from './MainBanner'
import ShopBanner from './ShopBanner'
import TourBanner from './TourBanner'

const Home = () => {
	return (
		<main className="main">
			<MainBanner />
			<TourItems />
			<TourBanner />
			<Tracks />
			<ShopBanner />
			<News />
		</main>
	)
}

export default Home