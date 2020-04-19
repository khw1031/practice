import createReducer from "../../common/createReducer";
import createItemsLogic from "../../common/createItemsLogic";
import mergeReducers from "../../common/mergeReducers";
import { MAX_AGE_LIMIT, MAX_SHOW_LIMIT } from "../common";
import FriendList from "../component/friendList";
/** Ducks Pattern
 * - 연관된 액션 타입, 액션 생성자 함수, 리듀서 함수를 하나의 파일로 관리
 * - 리듀서 함수는 default export
 * - 액션 생성자 함수는 export
 *
 * redux-thunk 패키지를 이용해서 비동기 코드를 작성하는 경우에는
 * 액션 생성자 함수의 코드 양이 많아진다. 이럴 때는 리듀서 코드와 액션 코드를
 * 별도의 파일로 분리하는게 낫다.
 */

// import createReducer from "../common/createReducer";

// const ADD = "friend/ADD";
// const REMOVE = "friend/REMOVE";
// const EDIT = "friend/EDIT";

// export const addFriend = friend => ({ type: ADD, friend });
// export const removeFriend = friend => ({ type: REMOVE, friend });
// export const editFriend = friend => ({ type: EDIT, friend });

// const INITIAL_STATE = { friends: [] };

// const reducer = createReducer(INITIAL_STATE, {
//   [ADD]: (state, action) => state.friends.push(action.friend),
//   [REMOVE]: (state, action) =>
//     (state.friends = state.friends.filter(
//       friend => friend.id !== action.friend.id
//     )),
//   [EDIT]: (state, action) => {
//     const index = state.friends.findIndex(
//       friend => friend.id === action.friend.id
//     );
//     if (index >= 0) {
//       state.friends[index] = action.friend;
//     }
//   },
// });

// export default reducer;

const { add, remove, edit, reducer: friendsReducer } = createItemsLogic(
  "friends"
);

const SET_AGE_LIMIT = "friend/SET_AGE_LIMIT";
const SET_SHOW_LIMIT = "friend/SET_SHOW_LIMIT";

export const addFriend = add;
export const removeFriend = remove;
export const editFriend = edit;
export const setAgeLimit = ageLimit => ({ type: SET_AGE_LIMIT, ageLimit });
export const setShowLimit = showLimit => ({ type: SET_SHOW_LIMIT, showLimit });

const INITIAL_STATE = {
  ageLimit: MAX_AGE_LIMIT,
  showLimit: MAX_SHOW_LIMIT,
};

const reducer = createReducer(INITIAL_STATE, {
  [SET_AGE_LIMIT]: (state, action) => (state.ageLimit = action.ageLimit),
  [SET_SHOW_LIMIT]: (state, action) => (state.showLimit = action.showLimit),
});

const reducers = [reducer, friendsReducer];

export default mergeReducers(reducers);
