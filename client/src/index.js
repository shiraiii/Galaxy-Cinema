import React from "react";
import ReactDOM from "react-dom/client";
import RouterCustom from "./router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import "./App.js";
import { store } from "./app/store.js";
import { useEffect } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RouterCustom />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
