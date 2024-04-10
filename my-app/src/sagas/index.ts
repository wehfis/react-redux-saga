import { all, fork } from 'redux-saga/effects';
import { AuthTokenWatcher } from './tokenSaga';
import { UserWatcher } from './userSaga';

export function* rootWatcher() {
    yield all([fork(AuthTokenWatcher), fork(UserWatcher)]);
}
