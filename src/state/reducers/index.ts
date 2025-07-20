import { combineReducers } from "redux";
import cellsReducer from "./cells-reducer";

const reducers = combineReducers({ cells: cellsReducer });

export type RootState = ReturnType<typeof reducers>;

export default reducers;
