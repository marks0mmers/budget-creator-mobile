import {ActionCreatorsMapObject, bindActionCreators, combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./user.slice";
import {useMemo} from "react";

export const store = configureStore({
    reducer: combineReducers({
        users: userReducer,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export const useMapDispatch = <T extends ActionCreatorsMapObject>(mapDispatch: T): T => {
    const dispatch = useDispatch();
    return useMemo(
        () => bindActionCreators(mapDispatch, dispatch),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [dispatch],
    );
};


export const useMapState: TypedUseSelectorHook<RootState> = useSelector;
