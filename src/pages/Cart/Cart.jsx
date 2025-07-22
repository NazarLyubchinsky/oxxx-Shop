import React from 'react'

import { useSelector } from 'react-redux'
import Section from '../../components/Section/Section'
import PageTitle from '../../components/Title/PageTitle'

import CartItem from './CartItem'
import CartTotal from './CartTotal'

const Cart = () => {
	const cart = useSelector((state) => state.cart.cart)

	return (
		<Section className='page'>
			<div className="container">
				<PageTitle text='Shop' />
				<div className="cart">
					<div className='cart__left'>
						<div>
							{cart?.map((item) => (
								<CartItem
									key={`${item.id}-${item.color}-${item.size}`}
									item={item}
								/>
							))}
						</div>
					</div>
					<div className="cart__right">
						<CartTotal />
					</div>
				</div>
			</div>
		</Section>

	)
}

export default Cart