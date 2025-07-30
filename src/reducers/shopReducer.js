import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// utils
import { request } from "../utils/common";
import { shopItemCollectionQuery, shopItemQuery } from "../utils/queries";

const initialState = {
  items: [],
  item: null,
  isLoading: false,
  lastFetch: null,
};

// feth request query
export const getShopsItems = createAsyncThunk(
  "shopItem/getShopsItems",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const { lastFetch, items } = state.shop;
    const now = Date.now();
    const cacheDuration = 10 * 60 * 1000; // 10 хвилин

    if (items.length > 0 && lastFetch && (now - lastFetch) < cacheDuration) {
      return items;
    }

    try {
      const data = await request(shopItemCollectionQuery);
      return data.shopItemCollection.items;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// item
export const getShopItem = createAsyncThunk(
	"shopItem/getShopItem",
	async (id, thunkAPI) => {
		try {
			const data = await request(shopItemQuery(id));
			return data.shopItem;
		} catch (err) {
			return thunkAPI.rejectWithValue(err);
		}
	}
);


const shopItemSlice = createSlice({
	name: "shopItem",
	initialState,

	extraReducers: (builder) => {
		builder
			.addCase(getShopsItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getShopsItems.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.items = payload;
        state.lastFetch = Date.now();
			})
			.addCase(getShopsItems.rejected, (state) => {
				state.isLoading = false;
			})

			.addCase(getShopItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getShopItem.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.item = payload;
			})
			.addCase(getShopItem.rejected, (state) => {
				state.isLoading = false;
			})

	},
	reducers:{
		resetItem(state) {
    state.item = null;
  },
		 setItemFromList(state, { payload }) {
    state.item = payload;
  },
	}
});

export default shopItemSlice.reducer;