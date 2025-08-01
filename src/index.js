

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";

import { BrowserRouter } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import ScrollToTop from "./utils/scrollToTop";
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import Preloader from "./components/Preloader/Preloader";


const root = createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<PersistGate persistor={persistor} loading={<Preloader />}>
			<BrowserRouter scrollBehavior="smooth">
				<ScrollToTop />
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>
)