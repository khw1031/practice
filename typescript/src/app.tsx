import React from "react";
import ReactDOM from "react-dom";
import Header from "components/Header";

const App = () => {
  const isDone: boolean = false;
  console.log(isDone);
  return (
    <div>
      <Header />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
