import { call, put, takeEvery } from 'redux-saga/effects';
import {
    IBoardActionType,
    errorResponse,
    getBoardsRequest,
    successResponseDelete,
    successResponseMultiple,
    successResponseSingle,
} from '../store/reducers/boardReducer';
import { IBoardModel } from '../Models/BoardModel';
import { boardApi } from '../Services/BoardService';
import { IBoardDto } from '../Dtos/BoardDto';

function* getBoards() {
    try {
        const response: IBoardModel[] = yield call(boardApi.getAllBoards);
        yield put(successResponseMultiple(response));
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}
function* getBoard(action: { type: IBoardActionType, payload: string }) {
    try {
        const response: IBoardModel = yield call(boardApi.getBoard, action.payload);
        yield put(successResponseSingle(response));
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}
function* createBoard(action: { type: IBoardActionType, payload: IBoardDto }) {
    try {
        const response: IBoardModel = yield call(boardApi.createBoard, action.payload);
        yield put(successResponseSingle(response));
        yield put(getBoardsRequest());
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}
function* deleteBoard(action: { type: IBoardActionType, payload: string }) {
    try {
        const response: boolean = yield call(boardApi.deleteBoard, action.payload);
        yield put(successResponseDelete(response));
        yield put(getBoardsRequest());
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}
function* editBoard(action: { type: IBoardActionType, payload: IBoardModel }) {
    try {
        const response: IBoardModel = yield call(boardApi.updateBoard, { title: action.payload.title } as IBoardDto, action.payload.id);
        yield put(successResponseSingle(response));
        yield put(getBoardsRequest());
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}

export function* BoardWatcher() {
    yield takeEvery(IBoardActionType.GET_BOARDS, getBoards);
    yield takeEvery(IBoardActionType.GET_BOARD, getBoard);
    yield takeEvery(IBoardActionType.DELETE_BOARD, deleteBoard);
    yield takeEvery(IBoardActionType.CREATE_BOARD, createBoard);
    yield takeEvery(IBoardActionType.UPDATE_BOARD, editBoard);
}
