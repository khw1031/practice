import React from "react";
import ReactDOM from "react-dom";
import { Global, css } from "@emotion/core";
import App from "./src/App";

ReactDOM.render(
  <>
    <Global
      styles={css`
        html {
          *,
          *::after,
          *::before {
            box-sizing: border-box;
          }
        }
        body {
          margin: 0;
        }
      `}
    />
    <App />
  </>,
  document.getElementById("app")
);
