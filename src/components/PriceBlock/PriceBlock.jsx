import React from 'react';
import { dolar, euro } from '../../utils/currency';

const PriceBlock = ({ price, discount, d4 }) => {
  const isLocalPrice = d4 !== undefined && d4 !== null;
  const fullPrice = isLocalPrice
    ? Math.ceil(d4 * dolar  * 1.2).toLocaleString('uk-UA') + ' грн./шт'
    : Math.ceil((price * euro) / 4).toLocaleString('uk-UA') + ' грн./шт';

  if (!discount) {
    return <span className="shop-list__item-price">{fullPrice}</span>;
  }

  const discountedPrice = Math.ceil((discount * euro) / 4).toLocaleString('uk-UA') + ' грн./шт';

  return (
    <>
      <span className="shop-list__item-price old-price">{fullPrice}</span>
      <span className="shop-list__item-priceSale">{discountedPrice}</span>
    </>
  );
};

export default PriceBlock;
