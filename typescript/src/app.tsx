import React from "react";
import ReactDOM from "react-dom";
import Header from "components/Header";
import { lib } from "../lib";

lib();

const App = () => (
  <div>
    <Header />
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
