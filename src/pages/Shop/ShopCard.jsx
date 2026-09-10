

import React, { memo } from 'react'
import { Link } from 'react-router-dom';

import { LazyLoadImage } from 'react-lazy-load-image-component';

import PriceBlock from '../../components/PriceBlock/PriceBlock';

// Якщо логотип у /public, можна так:
// const watermarkUrl = '/public/images/0-02-05-2ea2b8646444959a9191c5feec65ae5a543694a138425375e851378babbf180d_f52cd4cd5a29a098.jpg'

// Або імпорт (якщо логотип у src/assets)
// import watermarkUrl from '../../assets/watermark.png'

const ShopCard = memo(({ el }) => {
  const { sys: { id }, title, supplier, price, discount, d4, imageCollection } = el;
  const image = imageCollection?.items || [];
  const supplierValue = String(supplier || '').trim();
  const supplierPrefix = supplierValue.slice(0, 1) + supplierValue.slice(2, 3);
 
  // Видаляємо "dia", "DIA", "d", "D" з номерами (напр. dia57.1, DIA 66.6, D66.5, dia66,6, d66,6-57,1) з назви
  const cleanedTitle = title
    .replace(/(?:dia|DIA|d|D)\s*\d+(?:[.,]\d+)?(?:-\d+(?:[.,]\d+)?)?/gi, '') // цифри, можливий діапазон через -
    .replace(/,+/g, '') // видаляємо зайві коми, які могли залишитися
    .trim();
  const displayTitle = supplierPrefix ? `${supplierPrefix} ${cleanedTitle}` : cleanedTitle;
  
  return (
    <li className="shop-list__item" key={id}>


      <div className="shop-list__item-image">
      <Link to={`/shop/product/${id}`} state={{ item: el }}>
        {/* <div
        > */}
         

         {image[0] && (
  <LazyLoadImage
    className="shop-list__item-image"
    src={image[0].url}
    alt={displayTitle}
    wrapperProps={{
    style: { display: "block", width: "100%" }
  }}
  />
)}

              <div className="shop-list__item-preview" style={{ color:'black'}}>Швидкий перегляд</div>
        {/* </div> */}
      </Link>
      </div>

       <div className="shop-list__item-body">
      <h1 className="shop-list__item-title">{displayTitle}</h1>


      <div className="shop-list__item-price-block">
        <PriceBlock price={price} discount={discount} d4={d4}/>
      </div>
       </div>
    </li>
  )
})

export default ShopCard
