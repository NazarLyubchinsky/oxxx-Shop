

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopsItems } from "../reducers/shopReducer";

const CACHE_KEY = 'shopItemsCache';

export const useShopItems = () => {
  const dispatch = useDispatch();
  const { items = [], isLoading } = useSelector(({ shop }) => shop);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);

    if (cached && !items.length) {
      const parsed = JSON.parse(cached);
      dispatch({ type: 'shopItem/getShopsItems/fulfilled', payload: parsed });
    } else if (!items.length) {
      dispatch(getShopsItems()).then((result) => {
        if (result.payload) {
          localStorage.setItem(CACHE_KEY, JSON.stringify(result.payload));
        }
      });
    }
  }, [dispatch, items.length]);

  return { items, isLoading };
};