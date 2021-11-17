import { Action } from '@ngrx/store';
import { Tag } from 'src/app/config/interfaces';

export enum TagsActionType {
    ADD = '[Tags] Add',
    ADD_SUCCESS = '[Tags] Add Success',
    ADD_FAILURE = '[Tags] Add Failure',
    FETCH = '[Tags] Fetch',
    FETCH_SUCCESS = '[Tags] Fetch Success',
    FETCH_FAILURE = '[Tags] Fetch Failure',
    UPDATE = '[Tags] Update',
    UPDATE_SUCCESS = '[Tags] Update Success',
    UPDATE_FAILURE = '[Tags] Update Failure',
    DELETE = '[Tags] Delete',
    DELETE_SUCCESS = '[Tags] Delete Success',
    DELETE_FAILURE = '[Tags] Delete Failure'
}

export class Add implements Action {
    readonly type = TagsActionType.ADD;
    constructor(public tag: Tag) {}
}

export class AddSuccess implements Action {
    readonly type = TagsActionType.ADD_SUCCESS;
    constructor(public tag: Tag) {}
}

export class AddFailure implements Action {
    readonly type = TagsActionType.ADD_FAILURE;
    constructor(public error: any) {}
}

export class Fetch implements Action {
    readonly type = TagsActionType.FETCH;
    constructor() {}
}

export class FetchSuccess implements Action {
    readonly type = TagsActionType.FETCH_SUCCESS;
    constructor(public tags: Tag[]) {}
}

export class FetchFailure implements Action {
    readonly type = TagsActionType.FETCH_FAILURE;
    constructor(public error: any) {}
}

export class Update implements Action {
    readonly type = TagsActionType.UPDATE;
    constructor(public payload: any) {}
}

export class UpdateSuccess implements Action {
    readonly type = TagsActionType.UPDATE_SUCCESS;
    constructor(public payload: any) {}
}

export class UpdateFailure implements Action {
    readonly type = TagsActionType.UPDATE_FAILURE;
    constructor(public error: any) {}
}

export class Delete implements Action {
    readonly type = TagsActionType.DELETE;
    constructor(public tagId: string) {}
}

export class DeleteSuccess implements Action {
    readonly type = TagsActionType.DELETE_SUCCESS;
    constructor(public payload: any) {}
}

export class DeleteFailure implements Action {
    readonly type = TagsActionType.DELETE_FAILURE;
    constructor(public error: any) {}
}

export type ActionsUnion = 
    Add |
    AddSuccess |
    AddFailure |
    Fetch |
    FetchSuccess |
    FetchFailure |
    Update |
    UpdateSuccess |
    UpdateFailure |
    Delete |
    DeleteSuccess |
    DeleteFailure;