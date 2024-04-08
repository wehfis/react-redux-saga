import { call, put, takeEvery } from 'redux-saga/effects';
import {
    ITokenActionType,
    authSuccess,
    authFailure,
} from '../store/reducers/tokenReducer';
import { IUserResult, authApi } from '../Services/AuthService';
import Cookies from 'js-cookie';
import { IUserDto } from '../Dtos/UserDto';

function* login(action: { type: ITokenActionType, payload: IUserDto }) {
    try {
        const { username, password } = action.payload;
        const response: IUserResult = yield call(authApi.login, { username, password });
        console.log(response);
        if (response.success) {
            const refreshToken = Cookies.get('refreshToken')!;
            console.log(refreshToken);
            yield put(authSuccess(response.accessToken!, response.refreshToken!));
          } else {
            yield put(authFailure(response.message));
          }
    } catch (error: any) {
        yield put(authFailure(error.message));
    }
}

function* register(action: any) {
    try {
        const { username, password } = action.payload;
        const response: IUserResult = yield call(authApi.register, { username, password });
        console.log(response);
        if (response.success) {
            const refreshToken = Cookies.get('refreshToken')!;
            yield put(authSuccess(response.accessToken!, response.refreshToken!));
          } else {
            yield put(authFailure(response.message));
          }
    } catch (error: any) {
        yield put(authFailure(error.message));
    }
}

export function* AuthTokenWatcher() {
    yield takeEvery(ITokenActionType.LOGIN_REQUEST, login);
    yield takeEvery(ITokenActionType.REGISTER_REQUEST, register);
}
