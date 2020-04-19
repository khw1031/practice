import createReducer from "../../common/createReducer";
import createItemsLogic from "../../common/createItemsLogic";
import mergeReducers from "../../common/mergeReducers";

// const ADD = "timeline/ADD";
// const REMOVE = "timeline/REMOVE";
// const EDIT = "timeline/EDIT";
// const INCREASE_NEXT_PAGE = "timeline/INCREASE_NEXT_PAGE";

// export const addTimeline = timeline => ({ type: ADD, timeline });
// export const removeTimeline = timeline => ({ type: REMOVE, timeline });
// export const editTimeline = timeline => ({ type: EDIT, timeline });
// export const increaseNextPage = () => ({ type: INCREASE_NEXT_PAGE });

// const INITIAL_STATE = { timelines: [], nextPage: 0 };
// const reducer = createReducer(INITIAL_STATE, {
//   [ADD]: (state, action) => state.timelines.push(action.timeline),
//   [REMOVE]: (state, action) =>
//     (state.timelines = state.timelines.filter(
//       timeline => timeline.id !== action.timeline.id
//     )),
//   [EDIT]: (state, action) => {
//     const index = state.timelines.findIndex(
//       timeline => timeline.id === action.timeline.id
//     );
//     if (index >= 0) {
//       state.timelines[index] = action.timeline;
//     }
//   },
//   [INCREASE_NEXT_PAGE]: (state, action) => (state.nextPage += 1),
// });

// export default reducer;

const { add, remove, edit, reducer: timelinesReducer } = createItemsLogic(
  "timelines"
);

export const types = {
  INCREASE_NEXT_PAGE: "timeline/INCREASE_NEXT_PAGE",
  REQUEST_LIKE: "timeline/REQUEST_LIKE",
  ADD_LIKE: "timeline/ADD_LIKE",
  SET_LOADING: "timeline/SET_LOADING",
  SET_ERROR: "timeline/SET_ERROR",
  SET_TEXT: "timeline/SET_TEXT",
  TRY_SET_TEXT: "timeline/TRY_SET_TEXT",
};

export const actions = {
  addTimeline: add,
  removeTimeline: remove,
  editTimeline: edit,
  increaseNextPage: () => ({ type: types.INCREASE_NEXT_PAGE }),
  requestLike: timeline => ({ type: types.REQUEST_LIKE, timeline }),
  addLike: (timelineId, value) => ({ type: types.ADD_LIKE, timelineId, value }),
  setLoading: isLoading => ({
    type: types.SET_LOADING,
    isLoading,
  }),
  setError: error => ({
    type: types.SET_ERROR,
    error,
  }),
  setText: text => ({
    type: types.SET_TEXT,
    text,
  }),
  trySetText: text => ({
    type: types.TRY_SET_TEXT,
    text,
  }),
};

const INITIAL_STATE = { nextPage: 0, isLoading: false, error: "", text: "" };

const reducer = createReducer(INITIAL_STATE, {
  [types.INCREASE_NEXT_PAGE]: (state, action) => (state.nextPage += 1),
  [types.ADD_LIKE]: (state, action) => {
    const timeline = state.timelines.find(
      item => item.id === action.timelineId
    );
    if (timeline) {
      timeline.likes += action.value;
    }
  },
  [types.SET_LOADING]: (state, action) => (state.isLoading = action.isLoading),
  [types.SET_ERROR]: (state, action) => (state.error = action.error),
  [types.SET_TEXT]: (state, action) => (state.text = action.text),
});

const reducers = [reducer, timelinesReducer];

export default mergeReducers(reducers);
