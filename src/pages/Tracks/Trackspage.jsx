import React from 'react'
import Icon from '../../components/Icon/Icon'
import Preloader from '../../components/Preloader/Preloader'
import PageTitle from '../../components/Title/PageTitle'
import { useMusicPlayer } from '../../hooks/useMusicPlayer'
import { useTrackItems } from '../../hooks/useTrackItem'
import { getLocalDateString } from '../../utils/common'

const Trackspage = () => {

	const { items = [], isLoading } = useTrackItems()


	const { playing, handleTrackClick, currentTrack } = useMusicPlayer()

	return (
		<section className='tracks-page page'>
			<div className="container">
				<PageTitle text='All releases' />

				{isLoading ?
					<Preloader /> : (
						<>
							<ul className="tracks-list">
								{items.map(
									(track) => {

										const { sys: { id }, title,  date, description } = track;
										// const { sys: { id }, title, cover, date, description } = track;
										const iconName = playing && id === currentTrack?.sys.id ? 'pause' : 'play'

										return (
											<li key={id} className="tracks-list__item">
												<div className='tracks-list__item-image'>
													{/* <img src={cover.url} alt={title} /> */}
												</div>

												<div className="tracks-list__item-info">
													<p className="tracks-list__item-date">
														{getLocalDateString(date, { month: 'short' })}
													</p>
													<h2 className='tracks-list__item-title'>
														{title}
													</h2>
													<p className="tracks-list__item-description">
														{description}
													</p>
												</div>

												<button className='tracks-list__item-button' onClick={() => handleTrackClick(track)}>
													<span>Listen</span>
													<Icon name={iconName} />
												</button>
											</li>
										)
									})}
							</ul>
						</>
					)}
			</div>

		</section>
	)
}

export default Trackspage