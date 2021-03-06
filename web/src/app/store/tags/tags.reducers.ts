import { Category, Tag } from "src/app/config/interfaces";
import { TagsActionType, ActionsUnion } from "./tags.actions";

export interface TagState {
    isLoading: boolean;
    error: any;
    message: string;
    tags: Tag[];
    tag: Tag | null;
    category: Category[]
}

export const initialTagState: TagState = {
    isLoading: false,
    tags: [],
    message: '',
    error: null,
    tag: null,
    category: []
}

export function tagReducer(state = initialTagState, action: ActionsUnion): TagState {
    const cloneState = Object.assign({}, state);

    switch (action.type) {
        case TagsActionType.ADD_TAG:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case TagsActionType.ADD_TAG_SUCCESS:
            cloneState.isLoading = false;
            cloneState.tags = [ ...cloneState.tags, action.tag ];
            return cloneState;
        case TagsActionType.ADD_TAG_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        case TagsActionType.GET_TAG:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case TagsActionType.GET_TAG_SUCCESS:
            cloneState.isLoading = false;
            cloneState.tag = action.tag;
            cloneState.category = action.tag.category || [];
            return cloneState;
        case TagsActionType.GET_TAG_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        case TagsActionType.FETCH_TAG:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case TagsActionType.FETCH_TAG_SUCCESS:
            cloneState.isLoading = false;
            cloneState.tags = action.tags;
            return cloneState;
        case TagsActionType.FETCH_TAG_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        case TagsActionType.UPDATE_TAG:
            cloneState.error = null;
            cloneState.isLoading = true;
            cloneState.message = '';
            return cloneState;
        case TagsActionType.UPDATE_TAG_SUCCESS:
            cloneState.isLoading = false;
            cloneState.message = action.payload.message;
            const index = cloneState.tags.findIndex(t => t['id'] === action.payload.id);
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
        case TagsActionType.UPDATE_TAG_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        case TagsActionType.DELETE_TAG:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case TagsActionType.DELETE_TAG_SUCCESS:
            cloneState.isLoading = false;
            cloneState.message = action.payload.message;
            cloneState.tags = cloneState.tags.filter(t => t.id !== action.payload.id);
            return cloneState;
        case TagsActionType.DELETE_TAG_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        default:
            return cloneState;
    }
}