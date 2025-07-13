import { combineReducers } from "redux";
import repositoriesReducer from "./repositoriesReducer";

const reducers = combineReducers({
  repositories: repositoriesReducer,
});

export type RootStateType = ReturnType<typeof reducers>;
export default reducers;
