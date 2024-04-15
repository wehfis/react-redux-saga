import { call, put, takeEvery } from 'redux-saga/effects';
import {
    ICategoryActionType,
    errorResponse,
    getCategoriesRequest,
    successResponseDelete,
    successResponseMultiple,
    successResponseSingle,
} from '../store/reducers/categoryReducer';
import { ICategoryModel } from '../Models/CategoryModel';
import { categoryApi } from '../Services/CategoryService';
import { ICategoryDto } from '../Dtos/CategoryDto';
import { useAppSelector } from '../hooks/redux';

const board = useAppSelector(state => state.board.board);

function* getCategories(action: { type: ICategoryActionType, payload: string }) {
    try {
        const response: ICategoryModel[] = yield call(categoryApi.getAllCategories, action.payload);
        yield put(successResponseMultiple(response));
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}
function* getCategory(action: { type: ICategoryActionType, payload: string }) {
    try {
        const response: ICategoryModel = yield call(categoryApi.getCategory, action.payload);
        yield put(successResponseSingle(response));
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}
function* createCategory(action: { type: ICategoryActionType, payload: ICategoryDto }) {
    try {
        const response: ICategoryModel = yield call(categoryApi.createCategory, action.payload);
        yield put(successResponseSingle(response));
        if (board?.id) {
            yield call(getCategoriesRequest, board.id);
        }
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}
function* deleteCategory(action: { type: ICategoryActionType, payload: string }) {
    try {
        const response: boolean = yield call(categoryApi.deleteCategory, action.payload);
        yield put(successResponseDelete(response));
        if (board?.id) {
            yield call(getCategoriesRequest, board.id);
        }
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}
function* editCategory(action: { type: ICategoryActionType, payload: ICategoryModel }) {
    try {
        const response: ICategoryModel = yield call(categoryApi.updateCategory, { name: action.payload.name, board_id: action.payload.board_id } as ICategoryDto, action.payload.id);
        yield put(successResponseSingle(response));
        if (board?.id) {
            yield call(getCategoriesRequest, board.id);
        }
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}

export function* CategoryWatcher() {
    yield takeEvery(ICategoryActionType.GET_CATEGORIES, getCategories);
    yield takeEvery(ICategoryActionType.GET_CATEGORY, getCategory);
    yield takeEvery(ICategoryActionType.DELETE_CATEGORY, deleteCategory);
    yield takeEvery(ICategoryActionType.CREATE_CATEGORY, createCategory);
    yield takeEvery(ICategoryActionType.UPDATE_CATEGORY, editCategory);
}
