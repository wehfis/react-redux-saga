import { call, put, takeEvery } from 'redux-saga/effects';
import {
    IUserActionType,
    successResponse,
    unauthResponse,
} from '../store/reducers/userReducer';
import { userApi } from '../Services/UserService';
import { IUserModel } from '../Models/UserModel';

function* getUser() {
    try {
        console.log('saga');
        const response: IUserModel = yield call(userApi.getCurrentUser);
        console.log(response);
        yield put(successResponse(response.username));
    } catch (error: any) {
        yield put(unauthResponse(error.message));
    }
}

export function* UserWatcher() {
    yield takeEvery(IUserActionType.GET_USER, getUser);
}
