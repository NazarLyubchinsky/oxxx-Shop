import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// utils
import { request } from "../utils/common";
import {  shopItemQuery } from "../utils/queries";
import { fetchAllShopItems } from "../utils/fetchAllShopItems";

const initialState = {
  items: [],
  item: null,
  isLoading: false,
  lastFetch: null,
//   !
  isFetching: false,
};


export const getShopsItems = createAsyncThunk(
  "shopItem/getShopsItems",
  async (_, thunkAPI) => {
    // const { shop } = thunkAPI.getState();
  
    try {
      const allItems = await fetchAllShopItems();
      return allItems;
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
  console.log("getShopsItems pending");
  state.isLoading = true;
  state.isFetching = true;
})
			.addCase(getShopsItems.fulfilled, (state, { payload }) => {
  console.log("Fulfilled payload length:", payload.length);
  state.items = payload;
  state.lastFetch = Date.now();
  state.isLoading = false;
  state.isFetching = false;
})
		.addCase(getShopsItems.rejected, (state, action) => {
  console.log("getShopsItems rejected", action.error);
  state.isLoading = false;
  state.isFetching = false;
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

