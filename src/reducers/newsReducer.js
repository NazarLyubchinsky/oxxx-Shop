// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// // utils
// import { request } from "../utils/common";
// // import { newsItemCollectionQuery, newsItemQuery } from "../utils/queries";

// const initialState = {
// 	items: [],
// 	item: null,
// 	isLoading: false,
// };

// // feth request query


// // items
// // export const getNewsItems = createAsyncThunk(
// // 	"newsItems/getNewsItems",
// // 	async (_, thunkAPI) => {
// // 		try {
// // 			const data = await request(newsItemCollectionQuery);

// // 			const { items } = data.newsItemCollection;

// // 			return items;
// // 		} catch (err) {
// // 			return thunkAPI.rejectWithValue(err);
// // 		}
// // 	}
// // );



// // item
// export const getNewsItem = createAsyncThunk(
// 	"newsItems/getNewsItem",
// 	async (id, thunkAPI) => {
// 		try {
// 			const data = await request(newsItemQuery(id));

// 			return data.newsItem;
// 		} catch (err) {
// 			return thunkAPI.rejectWithValue(err);
// 		}
// 	}
// );


// // const newsItemsSlice = createSlice({
// // 	name: "newsItems",
// // 	initialState,

// // 	extraReducers: (builder) => {
// // 		builder
// // 			// items
// // 			.addCase(getNewsItems.pending, (state) => {
// // 				state.isLoading = true;
// // 			})
// // 			.addCase(getNewsItems.fulfilled, (state, { payload }) => {
// // 				state.isLoading = false;
// // 				state.items = payload;
// // 			})
// // 			.addCase(getNewsItems.rejected, (state) => {
// // 				state.isLoading = false;
// // 			})

// // 			// item
// // 			.addCase(getNewsItem.pending, (state) => {
// // 				state.isLoading = true;
// // 			})
// // 			.addCase(getNewsItem.fulfilled, (state, { payload }) => {
// // 				state.isLoading = false;
// // 				state.item = payload;
// // 			})
// // 			.addCase(getNewsItem.rejected, (state) => {
// // 				state.isLoading = false;
// // 			})

// // 	},
// // });

// export default newsItemsSlice.reducer;

