// import React, { useCallback, useEffect, useState } from 'react'

// import { useTourItems } from '../../hooks/useTourItems';

// import Preloader from '../../components/Preloader/Preloader';
// import TourItem from './TourItem';

const TourPage = () => {
	// const { items = [], isLoading } = useTourItems();

	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// const tabs = [...new Set(items.map(({ country }) => country))]

	// const [activeTab, setActiveTab] = useState(null)
	// const [filtered, setFiltered] = useState([])

	// const toggletab = useCallback((tab) => {
	// 	setActiveTab(tab)
	// 	setFiltered(items.filter(({ country }) => country === tab))
	// }, [items])


	// useEffect(() => {
	// 	if (tabs.length && !activeTab) toggletab(tabs[0])

	// }, [tabs, toggletab, activeTab])


	return (
		<section className='tour-page page'>
			<div className="container">
				{/* <PageTitle text='Concerts' /> */}

				{/* {isLoading ? <Preloader /> : (
					<>
						<ul className="tour-tabs">
							{tabs.map((tab, id) => (
								<li key={id} onClick={() => toggletab(tab)} className={`tour-tab ${activeTab === tab ? 'active' : ''}`} >
									{tab}
								</li>
							))}
						</ul>
						<ul className='tour-items'>
							{filtered.map((item, idx) => (
								<TourItem offset={100} key={item.sys.id} {...item} i={idx} />
							))}
						</ul>
					</>
				)} */}
			</div>
		</section>
	)
}

export default TourPage