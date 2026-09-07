import { request } from "../utils/common";
import { shopItemCollectionQuery } from "../utils/queries";

const LIMIT = 100;

export const fetchAllShopItems = async () => {
  let allItems = [];
  let skip = 0;
  let total = 0;

  do {
    const variables = { limit: LIMIT, skip };
    const data = await request(shopItemCollectionQuery, variables);

    const { items, total: totalCount } = data.shopItemCollection;

    total = totalCount;
    allItems = allItems.concat(items);
    skip += LIMIT;
  } while (skip < total);

  return allItems;
};