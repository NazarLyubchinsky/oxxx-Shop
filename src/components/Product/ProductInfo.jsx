
import React, { useState } from 'react';
import ProductTitle from './ProductTitle';


import { useDispatch } from 'react-redux';
import { addToCart } from '../../reducers/cartReducer';

const ProductInfo = ({ product }) => {
	const { sys: { id },  title, price,  discount } = product


	const [color, setColor] = useState('')
	const [size, setSize] = useState('')

	const colors = [
		'Red',
		'Blue',
		'Green',
		'Yellow',
		'Orange',
		'Purple',
	];

	const sizes = [
		'XS',
		'S',
		'M',
		'L',
		'XL',
		'XXL',
	];

	const dispatch = useDispatch()




	const addCart = () => {
		dispatch(addToCart({
			id,
			title,
			// url,
			price,
			// category,
			discount,
			color,
			size
		}));
	}

	return (
		<div className="product__info">
			<div className='product__info-text'>
				<ProductTitle product={product} />
			</div>
			<div className="product__center">
				<div className='product__color'>
					<p className="product__color-title">
						Колір
					</p>
					<ul className="product__color-list">
						{
							colors.map((item) => (
								<li key={item} style={{
									background: `${color === item ? 'grey' : 'transparent'}`
								}}
									onClick={() => {
										if (item) {
											setColor(item)
										}
									}}
									className={'product__size-item'}>
									{item}
								</li>
							))
						}
					</ul>
				</div>
				<div className='product__size'>
					<p className="product__size-title">
						Розмір
					</p>
					<ul className="product__size-list">
						{
							sizes.map((item) => (
								<li key={item} style={{
									background: `${size === item ? 'grey' : 'transparent'}`
								}}
									onClick={() => {
										if (item) {
											setSize(item)
										}
									}}
									className={'product__size-item'}>
									{item}
								</li>
							))
						}
					</ul>
				</div>
			</div>
			<div className="product__btns">
				<button onClick={addCart}
					className={`product__btn product__btn_cart ${!color && 'product__btn-disabled'}`}
					disabled={!color || !size}
				>
					{!color ? "Please select a color" : !size ? "Please select a size" : "Add to Cart"}
				</button>
			</div>
		</div>
	);
};

export default ProductInfo;


