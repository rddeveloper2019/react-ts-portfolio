import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootStateType } from "../state";

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
