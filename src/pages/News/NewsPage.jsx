import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/Icon/Icon';
import Preloader from '../../components/Preloader/Preloader';
import PageTitle from '../../components/Title/PageTitle';
import { useNewsItems } from '../../hooks/useNewsitems';
import { getLocalDateString } from '../../utils/common';

// components

const NewsPage = () => {
	const { items, isLoading } = useNewsItems();

	return (
		<section className="news-page page">
			<div className="container">
				<PageTitle text="All News" />

				{isLoading ? (
					<Preloader />
				) : (
					<div className="news-list">
						{/* {items.map(({ title, date, cover: { url }, sys: { id } }) => { */}
						{items.map(({ title, date,  sys: { id } }) => {
							return (
								<div className="news-list__item" key={id}>
									<div
										className="news-list__item-img"
										// style={{ backgroundImage: `url(${url})` }}
									/>
									<div className="news-list__item-info">
										<p className="news-list__item-date">
											{getLocalDateString(date, { month: "short" })}
										</p>
										<h2 className="news-list__item-title">{title}</h2>
										<Link to={`/news/${id}`} className="news-list__item-button">
											<span>Read</span>
											<Icon name="arrow-right" />
										</Link>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
}

export default NewsPage;
