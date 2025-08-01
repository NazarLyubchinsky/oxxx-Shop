
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopsItems } from "../reducers/shopReducer";

export const useShopItems = () => {
  const dispatch = useDispatch();
  const { items = [], isLoading, lastFetch, isFetching } = useSelector(({ shop }) => shop);

  useEffect(() => {
    const now = Date.now();
    const cacheDuration = 1000 * 60 * 60 * 3;

    const isCacheValid = lastFetch && now - lastFetch < cacheDuration;

    if ((!items.length || !isCacheValid) && !isFetching) {
      dispatch(getShopsItems());
    }
  }, [dispatch, items.length, lastFetch, isFetching]);

  return { items, isLoading };
};

