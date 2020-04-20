import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";

/**
 * I. 스토어의 subscribe 메서드를 사용한 예
 */

const INITIAL_STATE = { value: 0 };
const reducer = createReducer(INITIAL_STATE, {
  INCREMENT: state => (state += 1),
});
const store = createStore(reducer);

let prevState;
store.subscribe(() => {
  const state = store.getState();
  if (state === prevState) {
    console.log("상태값 같음");
  } else {
    console.log("상태값 변경");
  }
  prevState = state;
});

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "INCREMENT" });

ReactDOM.render(<App />, document.getElementById("app"));
