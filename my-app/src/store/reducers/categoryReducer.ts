import { ICategoryDto } from '../../Dtos/CategoryDto';
import { ICategoryModel } from '../../Models/CategoryModel';

// action types
export enum ICategoryActionType {
    GET_CATEGORIES = 'GET_CATEGORIES',
    GET_CATEGORY = 'GET_CATEGORY',
    CREATE_CATEGORY = 'CREATE_CATEGORY',
    UPDATE_CATEGORY = 'UPDATE_CATEGORY',
    DELETE_CATEGORY = 'DELETE_CATEGORY',
    CATEGORY_SUCCESS = 'CATEGORY_SUCCESS',
    CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS',
    CATEGORY_ERROR = 'CATEGORY_ERROR',
}

export interface ICategoryAction {
    type: ICategoryActionType;
    payload?: any;
}

// actions
export const getCategoriesRequest = (boardId: string) => ({
    type: ICategoryActionType.GET_CATEGORIES,
    payload: boardId,
});

export const getCategoryRequest = (categoryId: string) => ({
    type: ICategoryActionType.GET_CATEGORY,
    payload: categoryId,
});

export const postCategoryRequest = (newCategory: ICategoryDto) => ({
    type: ICategoryActionType.CREATE_CATEGORY,
    payload: newCategory,
});

export const putCategoryRequest = (updatedCategory: ICategoryModel) => ({
    type: ICategoryActionType.UPDATE_CATEGORY,
    payload: updatedCategory,
});

export const deleteCategoryRequest = (categoryId: string) => ({
    type: ICategoryActionType.DELETE_CATEGORY,
    payload: categoryId,
});

export const successResponseSingle = (category: ICategoryModel) => ({
    type: ICategoryActionType.CATEGORY_SUCCESS,
    payload: {category},
});

export const successResponseDelete = (isDeleted: boolean) => ({
    type: ICategoryActionType.CATEGORY_SUCCESS,
    payload: {isDeleted},
});

export const successResponseMultiple = (categories: ICategoryModel[]) => ({
    type: ICategoryActionType.CATEGORIES_SUCCESS,
    payload: {categories},
});

export const errorResponse = (error: string) => ({
    type: ICategoryActionType.CATEGORY_ERROR,
    payload: {error},
});

// state
export interface ICategoryState {
    category: ICategoryModel | null;
    categories: ICategoryModel[] | null;
    error: string | null;
}
const defaultState = {
    category: null,
    categories: null,
    error: null,
};

// reducer
export const categoryReducer = (
    state: ICategoryState = defaultState,
    action: ICategoryAction
): ICategoryState => {
    switch (action.type) {
        case ICategoryActionType.CATEGORIES_SUCCESS:
            return { ...state, categories: action.payload.categories, error: null };
        case ICategoryActionType.CATEGORY_SUCCESS:
            return { ...state, category: action.payload.category, error: null };
        case ICategoryActionType.CATEGORY_ERROR:
            return {
                ...state,
                category: null,
                categories: null,
                error: action.payload.error,
            };
        default:
            return state;
    }
};
