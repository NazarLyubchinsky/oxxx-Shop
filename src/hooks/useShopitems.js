import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopsItems } from "../reducers/shopReducer";

const CACHE_KEY = 'shopItemsCache';

export const useShopItems = () => {
	const dispatch = useDispatch();
	const { items = [], isLoading } = useSelector(({ shop }) => shop);

	const [isCacheLoaded, setIsCacheLoaded] = useState(false);

	useEffect(() => {
		// Спроба завантажити з кешу
		const cached = localStorage.getItem(CACHE_KEY);
		if (cached && !items.length) {
			const parsed = JSON.parse(cached);
			dispatch({ type: 'shopItem/getShopsItems/fulfilled', payload: parsed });
			setIsCacheLoaded(true);
		}
	}, [dispatch, items.length]);

	useEffect(() => {
		// Якщо кеш не був завантажений і нема товарів — робимо API запит
		if (!items.length && !isCacheLoaded) {
			dispatch(getShopsItems()).then((result) => {
				if (result.payload) {
					localStorage.setItem(CACHE_KEY, JSON.stringify(result.payload));
				}
			});
		}
	}, [dispatch, items.length, isCacheLoaded]);

	return { items, isLoading };
};
