import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { decrementQuantity, incrementQuantity, removeItem } from '../../reducers/cartReducer'
import { calculateDiscountedPrice } from '../../utils/common'

function CartItem({ item }) {
	const dispatch = useDispatch()

	// const { id, url, title, price, quantity = 0, discount, category, color, size } = item
	const { id, url, title, price, quantity = 0, discount, color, size } = item

	console.log(item)
	return (
		<div className="cartItem">
			<Link to={`/shop/${id}`}>
				<img className="cartItem__image" src={url} alt='item' />
			</Link>
			<div className="cartItem__info">
				<p className="cartItem__title">{title}</p>
				<p className="cartItem__category">
					<span>Category: </span>
					{/* <span className='cartItem__category-category'>{category}</span> */}
				</p>
				<p className="cartItem__color">
					<span>Color: </span>
					<span style={{ color: `${color}` }} className='cartItem__color-color'></span>
				</p>
				<p className="cartItem__size">
					<span>Size: </span>
					<span className='cartItem__size-size'>{size}</span>
				</p>
				<p className="cartItem__price">
					<small>$</small>
					{!discount ? <strong>{price}</strong> : <strong>{calculateDiscountedPrice(price, discount)}</strong>}
				</p>
				<div className='cartItem__incrDec'>
					<button onClick={() => dispatch(decrementQuantity({ id, color, size }))}>-</button>
					<p>{quantity}</p>
					<button onClick={() => dispatch(incrementQuantity({ id, color, size }))}>+</button>
				</div>
				<button
					className='cartItem__removeButton'
					onClick={() => dispatch(removeItem({ id, color, size }))}>
					Remove
				</button>
			</div>
		</div>
	)
}

export default CartItem