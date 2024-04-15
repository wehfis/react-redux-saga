import { IBoardDto } from '../../Dtos/BoardDto';
import { IBoardModel } from '../../Models/BoardModel';

// action types
export enum IBoardActionType {
    GET_BOARDS = 'GET_BOARDS',
    GET_BOARD = 'GET_BOARD',
    CREATE_BOARD = 'CREATE_BOARD',
    UPDATE_BOARD = 'UPDATE_BOARD',
    DELETE_BOARD = 'DELETE_BOARD',
    BOARD_SUCCESS = 'BOARD_SUCCESS',
    BOARDS_SUCCESS = 'BOARDS_SUCCESS',
    BOARD_ERROR = 'BOARD_ERROR',
}

export interface IBoardAction {
    type: IBoardActionType;
    payload?: any;
}

// actions
export const getBoardsRequest = () => ({
    type: IBoardActionType.GET_BOARDS,
});

export const getBoardRequest = (boardId: string) => ({
    type: IBoardActionType.GET_BOARD,
    payload: boardId,
});

export const postBoardRequest = (newBoard: IBoardDto) => ({
    type: IBoardActionType.CREATE_BOARD,
    payload: newBoard,
});

export const putBoardRequest = (updatedBoard: IBoardModel) => ({
    type: IBoardActionType.UPDATE_BOARD,
    payload: updatedBoard,
});

export const deleteBoardRequest = (boardId: string) => ({
    type: IBoardActionType.DELETE_BOARD,
    payload: boardId,
});

export const successResponseSingle = (board: IBoardModel) => ({
    type: IBoardActionType.BOARD_SUCCESS,
    payload: {board},
});

export const successResponseDelete = (isDeleted: boolean) => ({
    type: IBoardActionType.BOARD_SUCCESS,
    payload: {isDeleted},
});

export const successResponseMultiple = (boards: IBoardModel[]) => ({
    type: IBoardActionType.BOARDS_SUCCESS,
    payload: {boards},
});

export const errorResponse = (error: string) => ({
    type: IBoardActionType.BOARD_ERROR,
    payload: {error},
});

// state
export interface IBoardState {
    board: IBoardModel | null;
    boards: IBoardModel[] | null;
    error: string | null;
}
const defaultState = {
    board: null,
    boards: null,
    error: null,
};

// reducer
export const boardReducer = (
    state: IBoardState = defaultState,
    action: IBoardAction
): IBoardState => {
    switch (action.type) {
        case IBoardActionType.BOARDS_SUCCESS:
            return { ...state, boards: action.payload.boards, error: null };
        case IBoardActionType.BOARD_SUCCESS:
            return { ...state, board: action.payload.board, error: null };
        case IBoardActionType.BOARD_ERROR:
            return {
                ...state,
                board: null,
                boards: null,
                error: action.payload.error,
            };
        default:
            return state;
    }
};
