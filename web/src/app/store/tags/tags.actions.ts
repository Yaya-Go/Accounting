import { Action } from '@ngrx/store';
import { Tag } from 'src/app/config/interfaces';

export enum TagsActionType {
    ADD_TAG = '[Tags] Add',
    ADD_TAG_SUCCESS = '[Tags] Add Success',
    ADD_TAG_FAILURE = '[Tags] Add Failure',
    GET_TAG = '[Tags] Get',
    GET_TAG_SUCCESS = '[Tags] Get Success',
    GET_TAG_FAILURE = '[Tags] Get Failure',
    FETCH_TAG = '[Tags] Fetch',
    FETCH_TAG_SUCCESS = '[Tags] Fetch Success',
    FETCH_TAG_FAILURE = '[Tags] Fetch Failure',
    UPDATE_TAG = '[Tags] Update',
    UPDATE_TAG_SUCCESS = '[Tags] Update Success',
    UPDATE_TAG_FAILURE = '[Tags] Update Failure',
    DELETE_TAG = '[Tags] Delete',
    DELETE_TAG_SUCCESS = '[Tags] Delete Success',
    DELETE_TAG_FAILURE = '[Tags] Delete Failure'
}

export class AddTag implements Action {
    readonly type = TagsActionType.ADD_TAG;
    constructor(public tag: Tag) {}
}

export class AddTagSuccess implements Action {
    readonly type = TagsActionType.ADD_TAG_SUCCESS;
    constructor(public tag: Tag) {}
}

export class AddTagFailure implements Action {
    readonly type = TagsActionType.ADD_TAG_FAILURE;
    constructor(public error: any) {}
}

export class GetTag implements Action {
    readonly type = TagsActionType.GET_TAG;
    constructor(public tagId: string) {}
}

export class GetTagSuccess implements Action {
    readonly type = TagsActionType.GET_TAG_SUCCESS;
    constructor(public tag: Tag) {}
}

export class GetTagFailure implements Action {
    readonly type = TagsActionType.GET_TAG_FAILURE;
    constructor(public error: any) {}
}

export class FetchTag implements Action {
    readonly type = TagsActionType.FETCH_TAG;
    constructor() {}
}

export class FetchTagSuccess implements Action {
    readonly type = TagsActionType.FETCH_TAG_SUCCESS;
    constructor(public tags: Tag[]) {}
}

export class FetchTagFailure implements Action {
    readonly type = TagsActionType.FETCH_TAG_FAILURE;
    constructor(public error: any) {}
}

export class UpdateTag implements Action {
    readonly type = TagsActionType.UPDATE_TAG;
    constructor(public payload: any) {}
}

export class UpdateTagSuccess implements Action {
    readonly type = TagsActionType.UPDATE_TAG_SUCCESS;
    constructor(public payload: any) {}
}

export class UpdateTagFailure implements Action {
    readonly type = TagsActionType.UPDATE_TAG_FAILURE;
    constructor(public error: any) {}
}

export class DeleteTag implements Action {
    readonly type = TagsActionType.DELETE_TAG;
    constructor(public tagId: string) {}
}

export class DeleteTagSuccess implements Action {
    readonly type = TagsActionType.DELETE_TAG_SUCCESS;
    constructor(public payload: any) {}
}

export class DeleteTagFailure implements Action {
    readonly type = TagsActionType.DELETE_TAG_FAILURE;
    constructor(public error: any) {}
}

export type ActionsUnion = 
    AddTag |
    AddTagSuccess |
    AddTagFailure |
    GetTag |
    GetTagSuccess |
    GetTagFailure |
    FetchTag |
    FetchTagSuccess |
    FetchTagFailure |
    UpdateTag |
    UpdateTagSuccess |
    UpdateTagFailure |
    DeleteTag |
    DeleteTagSuccess |
    DeleteTagFailure;