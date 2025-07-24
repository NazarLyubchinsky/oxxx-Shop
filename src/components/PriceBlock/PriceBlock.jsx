import React from 'react';
import { calculateDiscountedPrice } from '../../utils/common';

const PriceBlock = ({ price, discount }) => {
  const fullPrice = Math.ceil((price * 47) / 4).toLocaleString('uk-UA') + ' грн./шт';

  if (!discount) {
    return <span className="shop-list__item-price">{fullPrice}</span>;
  }

  const discountedPrice = Math.ceil((calculateDiscountedPrice(price, discount) * 47) / 4).toLocaleString('uk-UA') + ' грн./шт';

  return (
    <>
      <span className="shop-list__item-price old-price">{fullPrice}</span>
      <span className="shop-list__item-priceSale">{discountedPrice}</span>
    </>
  );
};

export default PriceBlock;
