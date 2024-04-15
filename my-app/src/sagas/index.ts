import { all, fork } from 'redux-saga/effects';
import { AuthTokenWatcher } from './tokenSaga';
import { UserWatcher } from './userSaga';
import { BoardWatcher } from './boardSaga';
import { CategoryWatcher } from './categorySaga';
import { TaskWatcher } from './taskSaga';

export function* rootWatcher() {
    yield all([
        fork(AuthTokenWatcher),
        fork(UserWatcher),
        fork(BoardWatcher),
        fork(CategoryWatcher),
        fork(TaskWatcher),
    ]);
}
