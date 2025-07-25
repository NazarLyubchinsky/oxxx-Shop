

import React, { memo } from 'react'
import { Link } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import PriceBlock from '../../components/PriceBlock/PriceBlock';

// Якщо логотип у /public, можна так:
// const watermarkUrl = '/public/images/0-02-05-2ea2b8646444959a9191c5feec65ae5a543694a138425375e851378babbf180d_f52cd4cd5a29a098.jpg'

// Або імпорт (якщо логотип у src/assets)
// import watermarkUrl from '../../assets/watermark.png'

const ShopCard = memo(({ el }) => {
  const { sys: { id }, title,  price, discount, imageCollection } = el;
 const image = imageCollection?.items || [];
 console.log(image)
  return (
    <li className="shop-list__item" key={id}>


      <div className="shop-list__item-image">
      <Link to={`/shop/product/${id}`}>
        <div
        >
         

         {image[0] && (
  <LazyLoadImage
    effect="blur"
    className="shop-list__item-image"
    src={image[0].url}
    alt={title}
  />
)}

              <div className="shop-list__item-preview" style={{ color:'black'}}>Швидкий перегляд</div>
        </div>
      </Link>
      </div>

       <div className="shop-list__item-body">
       <h1 className="shop-list__item-title">{title}</h1>

{/* {!discount ? (
<span className="shop-list__item-price">
{Math.ceil(price * 47 / 4).toLocaleString('uk-UA')} грн./шт
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
)} */}

<PriceBlock price={price} discount={discount}/>
       </div>
    </li>
  )
})

export default ShopCard
