// import { createStore } from "redux";
// import { produce } from "immer";

// function createReducer(initialState, handlerMap) {
//   return function(state = initialState, action) {
//     return produce(state, draft => {
//       const handler = handlerMap[action.type];
//       if (handler) {
//         handler(draft, action);
//       }
//     });
//   };
// }

// const INITIAL_STATE = { value: 0 };
// const reducer = createReducer(INITIAL_STATE, {
//   INCREMENT: state => (state.value += 1),
// });

// const store = createStore(reducer);

// let prevState;
// store.subscribe(() => {
//   const state = store.getState();
//   if (state === prevState) {
//     console.log("상태값 같음");
//   } else {
//     console.log("상태값 변경됨");
//   }
//   prevState = state;
// });

// export default store;
