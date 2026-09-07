// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// // utils
// import { request } from "../utils/common";
// import { trakItemCollectionQuery } from "../utils/queries";

// const initialState = {
// 	items: [],
// 	isLoading: false,
// };

// // feth request query
// export const getTracksItems = createAsyncThunk(
// 	"tracksItems/getTrackstems",
// 	async (_, thunkAPI) => {
// 		try {
// 			const data = await request(trakItemCollectionQuery);

// 			const { items } = data.trackCollection;

// 			return items;
// 		} catch (err) {
// 			return thunkAPI.rejectWithValue(err);
// 		}
// 	}
// );

// const tracksItemsSlice = createSlice({
// 	name: "tracksItems",
// 	initialState,

// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(getTracksItems.pending, (state) => {
// 				state.isLoading = true;
// 			})
// 			.addCase(getTracksItems.fulfilled, (state, { payload }) => {
// 				state.isLoading = false;
// 				state.items = payload;
// 			})
// 			.addCase(getTracksItems.rejected, (state) => {
// 				state.isLoading = false;
// 			});
// 	},
// });

// export default tracksItemsSlice.reducer;