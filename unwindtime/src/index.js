import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import profileReducer from "./reducers/profile";
import locationReducer from "./reducers/location";
import favoRelaxMethodsSlice from "./reducers/favoRelaxMethods.ts";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const store = configureStore({
  reducer: {
    profile: profileReducer,
    favoRelaxMethods: favoRelaxMethodsSlice,
    location: locationReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorkerRegistration.register();
