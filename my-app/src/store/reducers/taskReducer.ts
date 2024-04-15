import { ITaskDto } from '../../Dtos/TaskDto';
import { ITaskModel } from '../../Models/TaskModel';

// action types
export enum ITaskActionType {
    GET_TASKS = 'GET_TASKS',
    GET_TASK = 'GET_TASK',
    CREATE_TASK = 'CREATE_TASK',
    UPDATE_TASK = 'UPDATE_TASK',
    DELETE_TASK = 'DELETE_TASK',
    TASK_SUCCESS = 'TASK_SUCCESS',
    TASKS_SUCCESS = 'TASKS_SUCCESS',
    TASK_ERROR = 'TASK_ERROR',
}

export interface ITaskAction {
    type: ITaskActionType;
    payload?: any;
}

// actions
export const getTasksRequest = (boardId: string) => ({
    type: ITaskActionType.GET_TASKS,
    payload: boardId,
});

export const getTaskRequest = (taskId: string) => ({
    type: ITaskActionType.GET_TASK,
    payload: taskId,
});

export const postTaskRequest = (newTask: ITaskDto) => ({
    type: ITaskActionType.CREATE_TASK,
    payload: newTask,
});

export const putTaskRequest = (updatedTask: ITaskModel) => ({
    type: ITaskActionType.UPDATE_TASK,
    payload: updatedTask,
});

export const deleteTaskRequest = (taskId: string) => ({
    type: ITaskActionType.DELETE_TASK,
    payload: taskId,
});

export const successResponseSingle = (task: ITaskModel) => ({
    type: ITaskActionType.TASK_SUCCESS,
    payload: {task},
});

export const successResponseDelete = (isDeleted: boolean) => ({
    type: ITaskActionType.TASK_SUCCESS,
    payload: {isDeleted},
});

export const successResponseMultiple = (tasks: ITaskModel[]) => ({
    type: ITaskActionType.TASKS_SUCCESS,
    payload: {tasks},
});

export const errorResponse = (error: string) => ({
    type: ITaskActionType.TASK_ERROR,
    payload: {error},
});

// state
export interface ITaskState {
    task: ITaskModel | null;
    tasks: ITaskModel[] | null;
    error: string | null;
}
const defaultState = {
    task: null,
    tasks: null,
    error: null,
};

// reducer
export const taskReducer = (
    state: ITaskState = defaultState,
    action: ITaskAction
): ITaskState => {
    switch (action.type) {
        case ITaskActionType.TASKS_SUCCESS:
            return { ...state, tasks: action.payload.tasks, error: null };
        case ITaskActionType.TASK_SUCCESS:
            return { ...state, tasks: action.payload.task, error: null };
        case ITaskActionType.TASK_ERROR:
            return {
                ...state,
                task: null,
                tasks: null,
                error: action.payload.error,
            };
        default:
            return state;
    }
};
