

// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {  useParams } from 'react-router-dom'
// import { getShopItem } from '../../reducers/shopReducer'
// import Preloader from '../Preloader/Preloader'
// import ProductInfo from './ProductInfo'
// import ProductSlide from './ProductSlide'
// import ProductTitle from './ProductTitle'

// const Product = () => {
// 	const { item,items, isLoading } = useSelector(({ shop }) => shop)
// 	const { id } = useParams()
// 	const dispatch = useDispatch()

// 	useEffect(() => {
//   if (!id) return;

//   dispatch({ type: 'shopItem/resetItem' });

//   const found = items.find(el => el.sys.id === id);
//   if (found) {
//     dispatch({ type: 'shopItem/setItemFromList', payload: found });
//   } else {
//     dispatch(getShopItem(id));
//   }
// }, [dispatch, id, items]);





// 	return (
// 		<section className='page product'>
// 			<div className="container">
// 				{isLoading || !item ? (
// 					<Preloader />
// 				) : (
// 					<div className="product__item">
// 						<div className="product__text">

// 							<ProductTitle product={item} />
// 						</div>
// 						<div className="product__row">
// 							<ProductSlide product={item} />
// 							<ProductInfo product={item} />
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</section>
// 	)
// }

// export default Product




import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useLocation, useParams } from 'react-router-dom'
import { getShopItem } from '../../reducers/shopReducer'
import Preloader from '../Preloader/Preloader'
import ProductInfo from './ProductInfo'
import ProductSlide from './ProductSlide'
import ProductTitle from './ProductTitle'

const Product = () => {
	  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { item, items, isLoading } = useSelector(state => state.shop);

  useEffect(() => {
    if (!id) return;

    dispatch({ type: 'shopItem/resetItem' });

    if (location.state?.item) {
      dispatch({ type: 'shopItem/setItemFromList', payload: location.state.item });
    } else {
      const found = items.find(el => el.sys.id === id);
      if (found) {
        dispatch({ type: 'shopItem/setItemFromList', payload: found });
      } else {
        dispatch(getShopItem(id));
      }
    }
  }, [dispatch, id, items, location.state]);





	return (
		<section className='page product'>
			<div className="container">
				{isLoading || !item ? (
					<Preloader />
				) : (
					<div className="product__item">
						<div className="product__text">

							<ProductTitle product={item} />
						</div>
						<div className="product__row">
							<ProductSlide product={item} />
							{/* <ProductInfo product={item} /> */}
						</div>
					</div>
				)}
			</div>
		</section>
	)
}

export default Product