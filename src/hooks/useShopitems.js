import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopsItems } from "../reducers/shopReducer";
import localShopItems from "../utils/shopItems.json";

export const useShopItems = () => {
  const dispatch = useDispatch();
  const { items = [], isLoading, lastFetch, isFetching } = useSelector(({ shop }) => shop);

  useEffect(() => {
    const now = Date.now();
    const cacheDuration = 1000 * 60 * 60 * 24; // 24 години
    // const cacheDuration = 1000 * 60 * 1; // 1хв
    const isCacheValid = lastFetch && (now - lastFetch < cacheDuration);

    if (!isFetching && (!items.length || !isCacheValid)) {
      dispatch(getShopsItems());
    }
  }, [dispatch, items.length, lastFetch, isFetching]);

  const allItems = useMemo(() => {
    const contentfulIds = new Set(items.map(item => item.sys?.id));
    const additionalItems = localShopItems.filter(item => !contentfulIds.has(item.sys?.id));

    return [...items, ...additionalItems];
  }, [items]);

  return { items: allItems, isLoading };
};





