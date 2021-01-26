import * as React from "react";

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

const AppReducer: React.Reducer<ICounter, IReducer> = (state, action) => {
    switch (action.type) {
        case ActionType.CHANGE_PAGE:
            return {
                ...state,
                pageNum: [...state.pageNum[state.pageNum.length - 1], action.payload]
            };
        case ActionType.ADD_AFTER:
            return {
                ...state,
                after: action.payload
            };
        case ActionType.SET_CLICK_DIRECTION:
            return {
                ...state,
                clickDirection: action.payload
            };
        default:
            return state;
    }
};
export default AppReducer;
