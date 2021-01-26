import * as React from "react";
import AppReducer from "./AppReducer";

interface IPageNum {
    pageNum: number[];
    after: string;
    clickDirection: string;
}

const initialState: IPageNum = {
    pageNum: [1],
    after: "",
    clickDirection: ""
};

enum ActionType {
    CHANGE_PAGE = "CHANGE_PAGE",
    ADD_AFTER = "ADD_AFTER",
    SET_CLICK_DIRECTION = "SET_CLICK_DIRECTION"
}

interface IReducer {
    type: ActionType;
    payload: number | string;
}

interface ICounter {
    pageNum: number[];
    after: string;
    clickDirection: string;
}

export const GlobalContext = React.createContext<IPageNum>(initialState);
export const GlobalProvider: React.FC<React.ReactNode> = ({children}) => {
    const [state, dispatch] = React.useReducer<React.Reducer<ICounter, IReducer>>(
        AppReducer,
        initialState
    );
    const changePage = (id) => {
        dispatch({
            type: ActionType.CHANGE_PAGE,
            payload: id
        });
    };
    const addAfter = (id) => {
        dispatch({
            type: ActionType.ADD_AFTER,
            payload: id
        });
    };
    const setClickDirection = (d) => {
        dispatch({
            type: ActionType.SET_CLICK_DIRECTION,
            payload: d
        });
    };
    return (
        <GlobalContext.Provider
            value={{
                pageNum: state.pageNum,
                after: state.after,
                clickDirection: state.clickDirection,
                changePage,
                addAfter,
                setClickDirection
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
