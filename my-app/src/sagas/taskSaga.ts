import { call, put, takeEvery } from 'redux-saga/effects';
import {
    ITaskActionType,
    errorResponse,
    getTasksRequest,
    successResponseDelete,
    successResponseMultiple,
    successResponseSingle,
} from '../store/reducers/taskReducer';
import { ITaskModel } from '../Models/TaskModel';
import { taskApi } from '../Services/TaskService';
import { ITaskDto } from '../Dtos/TaskDto';

function* getTasks(action: { type: ITaskActionType; payload: string }) {
    try {
        const response: ITaskModel[] = yield call(
            taskApi.getAllTasks,
            action.payload
        );
        yield put(successResponseMultiple(response));
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}
function* getTask(action: { type: ITaskActionType; payload: string }) {
    try {
        const response: ITaskModel = yield call(
            taskApi.getTask,
            action.payload
        );
        yield put(successResponseSingle(response));
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}
function* createTask(action: { type: ITaskActionType; payload: ITaskDto }) {
    try {
        const response: ITaskModel = yield call(
            taskApi.createTask,
            action.payload
        );
        yield put(successResponseSingle(response));
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}
function* deleteTask(action: { type: ITaskActionType; payload: string }) {
    try {
        const response: boolean = yield call(
            taskApi.deleteTask,
            action.payload
        );
        yield put(successResponseDelete(response));
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}
function* editTask(action: { type: ITaskActionType; payload: ITaskModel }) {
    try {
        const response: ITaskModel = yield call(
            taskApi.updateTask,
            {
                title: action.payload.title,
                description: action.payload.description,
                category_id: action.payload.category_id,
                board_id: action.payload.board_id,
            } as ITaskDto,
            action.payload.id
        );
        yield put(successResponseSingle(response));
    } catch (error: any) {
        yield put(errorResponse(error.message));
    }
}

export function* TaskWatcher() {
    yield takeEvery(ITaskActionType.GET_TASKS, getTasks);
    yield takeEvery(ITaskActionType.GET_TASK, getTask);
    yield takeEvery(ITaskActionType.DELETE_TASK, deleteTask);
    yield takeEvery(ITaskActionType.CREATE_TASK, createTask);
    yield takeEvery(ITaskActionType.UPDATE_TASK, editTask);
}
