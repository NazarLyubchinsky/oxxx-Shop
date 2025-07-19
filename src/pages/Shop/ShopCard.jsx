
// import React, { memo } from 'react'
// import { Link } from 'react-router-dom';

// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';

// import { calculateDiscountedPrice } from '../../utils/common';

// const ShopCard = memo(({ el }) => {
// // 	const { sys: { id }, title, cover: { url }, description, price, discount } = el;

// 	const { sys: { id }, title, cover: { url },  price, discount } = el;


// 	return (
// 		<li className="shop-list__item" key={id}>
// 			{!discount ? <span className="shop-list__item-price">{price} $</span> : <span className="shop-list__item-priceSale">{calculateDiscountedPrice(price, discount)} $</span>}
// 			<Link to={`/shop/product/${id}`} >
// 				<LazyLoadImage effect='blur' className="shop-list__item-image" src={url } alt={el.title} />
// 			</Link>
// 			<h1 className="shop-list__item-title">{title}</h1>
// 			{/* <hr /> */}
// 			{/* <p className="shop-list__item-description">{description} </p> */}
// 			{/* <Link to={`/shop/${id}`} className="shop-list__item-btn btn">Buy Now</Link> */}
// 		</li>
// 	)
// })

// export default ShopCard



import React, { memo } from 'react'
import { Link } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { calculateDiscountedPrice } from '../../utils/common';

// Якщо логотип у /public, можна так:
// const watermarkUrl = '/public/images/0-02-05-2ea2b8646444959a9191c5feec65ae5a543694a138425375e851378babbf180d_f52cd4cd5a29a098.jpg'

// Або імпорт (якщо логотип у src/assets)
// import watermarkUrl from '../../assets/watermark.png'

const ShopCard = memo(({ el }) => {
  const { sys: { id }, title, cover: { url }, price, discount } = el;

  return (
    <li className="shop-list__item" key={id}>
     

      <Link to={`/shop/product/${id}`}>
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <LazyLoadImage
            effect="blur"
            className="shop-list__item-image"
            src={url}
            alt={title}
          />

              <div className="shop-list__item-preview" style={{ color:'black'}}>Швидкий перегляд</div>
        </div>
      </Link>

      <h1 className="shop-list__item-title">{title}</h1>

      {!discount ? (
  <span className="shop-list__item-price">
    {Math.ceil(price * 47 / 4).toLocaleString('uk-UA')}грн./шт
  </span>
) : (
  <>
    <span className="shop-list__item-price old-price">
      {Math.ceil(price * 47 / 4).toLocaleString('uk-UA')} грн./шт
    </span>
    <span className="shop-list__item-priceSale">
      {Math.ceil(calculateDiscountedPrice(price, discount) * 47 / 4).toLocaleString('uk-UA')} грн./шт
    </span>
  </>
)}
    </li>
  )
})

export default ShopCard
