import Cookies from 'js-cookie';

// action types
export enum ITokenActionType {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    REGISTER_REQUEST = 'REGISTER_REQUEST',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAILURE = 'AUTH_FAILURE',
    LOGOUT = 'LOGOUT',
}

export interface ITokenAction {
    type: ITokenActionType;
    payload?: any;
}

// actions
export const loginRequest = (username: string, password: string) => ({
    type: ITokenActionType.LOGIN_REQUEST,
    payload: { username, password },
});

export const registerRequest = (username: string, password: string) => ({
    type: ITokenActionType.REGISTER_REQUEST,
    payload: { username, password },
});

export const authSuccess = (accessToken: string, refreshToken: string) => ({
    type: ITokenActionType.AUTH_SUCCESS,
    payload: { accessToken, refreshToken },
});

export const authFailure = (error: string) => ({
    type: ITokenActionType.AUTH_FAILURE,
    payload: error,
});

export const logout = () => ({
    type: ITokenActionType.LOGOUT,
});

// state
export interface ITokenState {
    accessToken: string | null;
    refreshToken: string | null;
    error: string | null;
}
const defaultState = {
    accessToken:
        localStorage.getItem('token') || Cookies.get('accessToken') || null,
    refreshToken: Cookies.get('refreshToken') || null,
    error: null,
};

// reducer
export const tokenReducer = (
    state: ITokenState = defaultState,
    action: ITokenAction
): ITokenState => {
    switch (action.type) {
        case ITokenActionType.AUTH_SUCCESS:
            return { ...state, accessToken: action.payload.accessToken, refreshToken: action.payload.refreshToken, error: null };
        case ITokenActionType.AUTH_FAILURE:
            return { ...state, accessToken: null, error: action.payload };
        default:
            return state;
    }
};
