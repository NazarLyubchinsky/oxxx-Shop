import React from 'react';

const PriceBlock = ({ price, discount }) => {
  const fullPrice = Math.ceil((price * 47) / 4).toLocaleString('uk-UA') + ' грн./шт';

  if (!discount) {
    return <span className="shop-list__item-price">{fullPrice}</span>;
  }

  // `discount` is now the final price in USD (not percent). Convert using rate 47.
  const discountedPrice = Math.ceil((discount * 47) / 4).toLocaleString('uk-UA') + ' грн./шт';

  return (
    <>
      <span className="shop-list__item-price old-price">{fullPrice}</span>
      <span className="shop-list__item-priceSale">{discountedPrice}</span>
    </>
  );
};

export default PriceBlock;
