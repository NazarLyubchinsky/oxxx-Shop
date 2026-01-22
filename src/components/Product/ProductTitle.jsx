import PriceBlock from '../PriceBlock/PriceBlock'

const ProductTitle = ({ product }) => {
	// const { title, category, discount, price } = product
	const { title,  discount, price } = product
	return (
		<>
			<h2 className="product__title">
				{title}
			</h2>
			<p className="product__category">
				{/* {category} */}
			</p>
			{/* {
				discount ? (
					<div className="product__price">
						<p className='price__sale' style={{ textDecoration: 'line-through', fontFamily: 'Raleway' }}>
							{price}
						</p>
						<p className='price__sale'>
							/
						</p>
						<p className='price__sale'>
							{!discount ? `${price} $` : <span className="product__price-priceSale">{calculateDiscountedPrice(price, discount)} $</span>}
						</p>
					</div>
				) : (
					<div className="product__price">
						<p className='price__sale'>
							{price} $
						</p>
					</div>
				)
			} */}
			<PriceBlock price={price} discount={discount}/>
		</>
	)
}

export default ProductTitle