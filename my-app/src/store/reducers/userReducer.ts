// action types
export enum IUserActionType {
    GET_USER = 'GET_USER',
    USER_SUCCESS = 'USER_SUCCESS',
    USER_ERROR = 'USER_ERROR',
}

export interface IUserAction {
    type: IUserActionType;
    payload?: any;
}

// actions
export const getUserRequest = () => ({
    type: IUserActionType.GET_USER,
});

export const successResponse = (username: string) => ({
    type: IUserActionType.USER_SUCCESS,
    payload: { username },
});
export const unauthResponse = (error: string) => ({
    type: IUserActionType.USER_ERROR,
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
    action: IUserAction
): IUserState => {
    switch (action.type) {
        case IUserActionType.USER_SUCCESS:
            return { ...state, username: action.payload.username, error: null };
        case IUserActionType.USER_ERROR:
            return { ...state, username: null, error: action.payload.error };
        default:
            return state;
    }
};
