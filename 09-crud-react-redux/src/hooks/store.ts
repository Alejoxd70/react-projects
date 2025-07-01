import type { AppDispatch, RootState } from "../store"
import type { TypedUseSelectorHook } from "react-redux"
import { useDispatch, useSelector } from "react-redux"

// This provides autocomplete and type safety when selecting state
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// This provides type safety when dispatching actions
export const useAppDispatch: () => AppDispatch = useDispatch