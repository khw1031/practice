import React from "react";
import ReactDOM from "react-dom";
import App from "./component/app";
import { Provider } from "react-redux";
import store from "./common/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
