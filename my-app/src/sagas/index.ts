import { all } from 'redux-saga/effects';
import { AuthTokenWatcher } from './tokenSaga';


export function* rootWatcher() {
    yield all([AuthTokenWatcher()])
}
