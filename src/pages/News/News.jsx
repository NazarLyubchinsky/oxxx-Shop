import React, { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import { SLIDER_BUTTON_TYPES } from '../../utils/constants';
import { useNewsItems } from '../../hooks/useNewsitems';

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules'
import 'swiper/css'


// components
import Preloader from '../../components/Preloader/Preloader';
import Icon from '../../components/Icon/Icon';
import SectionTitle from '../../components/Title/SectionTitle';
import Section from '../../components/Section/Section';

const News = () => {
	const { PREV, NEXT } = SLIDER_BUTTON_TYPES

	const sliderRef = useRef()

	const { items = [], isLoading } = useNewsItems();

	// navigation swiper
	const handleButtonClick = useCallback((type) => {
		if (!sliderRef.current) return

		const { swiper } = sliderRef.current

		type === NEXT ? swiper.slideNext() :
			swiper.slidePrev()
	}, [NEXT])

	return (
		<Section className="news-section" >
			<div className="container">
				<SectionTitle text="News" />
				{isLoading ? (
					<Preloader />
				) : (
					<Swiper
						ref={sliderRef}
						spaceBetween={24}
						slidesPerView={4}
						className="news"
						navigation
						modules={[Navigation]}
						breakpoints={{
							992: {
								slidesPerView: 4,
							},
							762: {
								slidesPerView: 3,
							},
							
							500: {
								slidesPerView: 2,
							},
							320: {
								slidesPerView: 1,
							},
							
						}}
					>
						{/* {items.map(({ title, sys: { id }, cover: { url } }, i) => ( */}
						{items.map(({ title, sys: { id } }, i) => (
							<SwiperSlide key={id}
							>
								<ScrollAnimation
									animateIn="fadeInLeft"
									animateOut="fadeOutLeft"
									delay={i * 100}
								>
									<Link className="news-item" to={`/news/${id}`}>
										<div className="news-item__img">
											{/* <img src={url} alt={title} /> */}
										</div>
										<h3 className="news-item__title">{title}</h3>
									</Link>
								</ScrollAnimation>
							</SwiperSlide>
						))}
						<div className="navigation">
							<div
								className="navigation-button navigation-prev"
								onClick={() => handleButtonClick(PREV)}
							>
								<Icon name="slider-arrow" />
							</div>
							<div
								className="navigation-button navigation-next"
								onClick={() => handleButtonClick(NEXT)}
							>
								<Icon name="slider-arrow" />
							</div>
						</div>
					</Swiper>
				)}
			</div>
		</Section>
	)
}

export default News