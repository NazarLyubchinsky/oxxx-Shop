
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopsItems } from "../reducers/shopReducer";

export const useShopItems = () => {
  const dispatch = useDispatch();
  const { items = [], isLoading, lastFetch, isFetching } = useSelector(({ shop }) => shop);


useEffect(() => {
  const now = Date.now();
  const cacheDuration = 1000 * 60 * 60 * 3; // 3 години
  // const cacheDuration = 1000 * 60 * 1; // 1хв 
  const isCacheValid = lastFetch && (now - lastFetch < cacheDuration);

  if (!isFetching && (!items.length || !isCacheValid)) {
    dispatch(getShopsItems());
  }
}, [dispatch, items.length, lastFetch, isFetching]);


  return { items, isLoading };
};





