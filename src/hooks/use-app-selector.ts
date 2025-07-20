import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state/reducers";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
