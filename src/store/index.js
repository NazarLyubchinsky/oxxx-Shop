

// import { configureStore } from "@reduxjs/toolkit";
// import { cartReducer } from "../reducers/cartReducer";
// import newsReducer from "../reducers/newsReducer";
// import shopReducer from "../reducers/shopReducer";

// // reducers
// import tourReducer from "../reducers/tourReducer";
// import tracksReducer from "../reducers/tracksReducer";

// // storage state
// import storage from 'redux-persist/lib/storage';
// import {
// 	persistStore, persistReducer, FLUSH,
// 	REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
// } from 'redux-persist'

// const persistConfig = {
// 	key: 'root',
// 	storage,
// }



// const persistedReducer = persistReducer(persistConfig, cartReducer)

// export const store = configureStore({
// 	reducer: {
// 		tour: tourReducer,
// 		tracks: tracksReducer,
// 		news: newsReducer,
// 		shop: shopReducer,
// 		cart: persistedReducer
// 	},
// 	middleware: (getDefaultMiddleware) =>
// 		getDefaultMiddleware({
// 			serializableCheck: {
// 				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// 			},
// 		}),
// 	devTools: true,
// })
// export const persistor = persistStore(store)


import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../reducers/newsReducer";
import shopReducer from "../reducers/shopReducer";
import tourReducer from "../reducers/tourReducer";
import tracksReducer from "../reducers/tracksReducer";

import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const shopPersistConfig = {
  key: 'shop',
  storage,
  whitelist: ['items'], // кешуємо лише items
};

const persistedShopReducer = persistReducer(shopPersistConfig, shopReducer);

export const store = configureStore({
  reducer: {
    tour: tourReducer,
    tracks: tracksReducer,
    news: newsReducer,
    shop: persistedShopReducer,
    // cart: cartReducer, // якщо не хочеш корзину - просто не додавай
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);
