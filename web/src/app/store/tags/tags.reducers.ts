import { Tag } from "src/app/config/interfaces";
import { TagsActionType, ActionsUnion } from "./tags.actions";

export interface TagState {
    isLoading: boolean;
    error: any;
    message: string;
    tags: Tag[]
}

export const initialTagState: TagState = {
    isLoading: false,
    tags: [],
    message: '',
    error: null
}

export function tagReducer(state = initialTagState, action: ActionsUnion): TagState {
    const cloneState = Object.assign({}, state);

    switch (action.type) {
        case TagsActionType.ADD:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case TagsActionType.ADD_SUCCESS:
            cloneState.isLoading = false;
            cloneState.tags = [ ...cloneState.tags, action.tag ];
            return cloneState;
        case TagsActionType.ADD_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        case TagsActionType.FETCH:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case TagsActionType.FETCH_SUCCESS:
            cloneState.isLoading = false;
            cloneState.tags = action.tags;
            return cloneState;
        case TagsActionType.FETCH_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        case TagsActionType.UPDATE:
            cloneState.error = null;
            cloneState.isLoading = true;
            cloneState.message = '';
            return cloneState;
        case TagsActionType.UPDATE_SUCCESS:
            cloneState.isLoading = false;
            cloneState.message = action.payload.message;
            const index = cloneState.tags.findIndex(t => t['tagId'] === action.payload.tagId);
            return { 
                ...cloneState,
                tags: [
                    ...cloneState.tags.slice(0, index),
                    {
                        ...cloneState.tags[index],
                        name: action.payload.name
                    },
                    ...cloneState.tags.slice(index + 1)
                ]
            };
        case TagsActionType.UPDATE_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        case TagsActionType.DELETE:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case TagsActionType.DELETE_SUCCESS:
            cloneState.isLoading = false;
            cloneState.message = action.payload.message;
            cloneState.tags = cloneState.tags.filter(t => t.tagId !== action.payload.tagId);
            return cloneState;
        case TagsActionType.DELETE_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        default:
            return cloneState;
    }
}