import { Category } from "src/app/config/interfaces";
import { CategoryActionType, ActionsUnion } from "./category.actions";

export interface CategoryState {
    isLoading: boolean;
    error: any;
    message: string;
    list: Category[]
}

export const initialCategoryState: CategoryState = {
    isLoading: false,
    list: [],
    message: '',
    error: null
}

export function categoryReducer(state = initialCategoryState, action: ActionsUnion): CategoryState {
    const cloneState = Object.assign({}, state);

    switch (action.type) {
        case CategoryActionType.ADD:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case CategoryActionType.ADD_SUCCESS:
            cloneState.isLoading = false;
            cloneState.list = [ ...cloneState.list, action.category ];
            return cloneState;
        case CategoryActionType.ADD_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        case CategoryActionType.FETCH:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case CategoryActionType.FETCH_SUCCESS:
            cloneState.isLoading = false;
            cloneState.list = action.list;
            return cloneState;
        case CategoryActionType.FETCH_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        case CategoryActionType.UPDATE:
            cloneState.error = null;
            cloneState.isLoading = true;
            cloneState.message = '';
            return cloneState;
        case CategoryActionType.UPDATE_SUCCESS:
            cloneState.isLoading = false;
            cloneState.message = action.payload.message;
            const index = cloneState.list.findIndex(c => c['categoryId'] === action.payload.categoryId);
            return { 
                ...cloneState,
                list: [
                    ...cloneState.list.slice(0, index),
                    {
                        ...cloneState.list[index],
                        name: action.payload.name
                    },
                    ...cloneState.list.slice(index + 1)
                ]
            };
        case CategoryActionType.UPDATE_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        case CategoryActionType.DELETE:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case CategoryActionType.DELETE_SUCCESS:
            cloneState.isLoading = false;
            cloneState.message = action.payload.message;
            cloneState.list = cloneState.list.filter(c => c.categoryId !== action.payload.categoryId);
            return cloneState;
        case CategoryActionType.DELETE_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        default:
            return cloneState;
    }
}