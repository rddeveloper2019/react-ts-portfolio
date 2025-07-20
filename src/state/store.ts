import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { insertCellBefore } from "./action-creators";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// console.log(store.getState());
// store.dispatch(insertCellBefore(null, "code"));
// console.log(store.getState());
// console.log(store.getState());
// store.dispatch(insertCellBefore(null, "text"));
// console.log(store.getState());
// const id = store.getState().cells.order[0];
// store.dispatch(insertCellBefore(id, "text"));
// console.log(store.getState());
