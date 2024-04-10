import { IBoardModel } from '../../Models/BoardModel';

// action types
export enum IBoardActionType {
    GET_BOARDS = 'GET_BOARDS',
    GET_BOARD = 'GET_BOARD',
    CREATE_BOARD = 'CREATE_BOARD',
    UPDATE_BOARD = 'UPDATE_BOARD',
    DELETE_BOARD = 'DELETE_BOARD',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export interface IBoardAction {
    type: IBoardActionType;
    payload?: any;
}

// actions
export const getBoardsRequest = () => ({
    type: IBoardActionType.GET_BOARDS,
});

export const getBoardRequest = () => ({
    type: IBoardActionType.GET_BOARD,
});

// export const successResponse = (boards: IBoardModel[]) => ({
//     type: IBoardActionType.SUCCESS,
//     payload: { username },
// });

export const errorResponse = (error: string) => ({
    type: IBoardActionType.ERROR,
    payload: { error },
});

// state
export interface IUserState {
    username: string | null;
    error: string | null;
}
const defaultState = {
    username: null,
    error: null,
};

// reducer
export const userReducer = (
    state: IUserState = defaultState,
    action: IBoardAction
): IUserState => {
    switch (action.type) {
        case IBoardActionType.SUCCESS:
            return { ...state, username: action.payload.username, error: null };
        case IBoardActionType.ERROR:
            return { ...state, username: null, error: action.payload.error };
        default:
            return state;
    }
};
