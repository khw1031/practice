import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import App from "./components/app";
import mainReducer from "./components/state/reducers";
import thunkMiddleware from "redux-thunk";

/**
 *
 * React, ReactDOM
 * - React allows you to create elements
 * - ReactDOM renders elements
 *
 * 분리 된 이유?
 * - 브라우저 DOM 뿐만아니라 다양한 환경에 대응하기 위해서
 * - Canvas, WebVR, Native 등
 *
 */

const store = createStore(mainReducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
