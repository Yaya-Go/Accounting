import { Action } from '@ngrx/store';
import { Category } from 'src/app/config/interfaces';

export enum CategoryActionType {
    ADD = '[Category] Add',
    ADD_SUCCESS = '[Category] Add Success',
    ADD_FAILURE = '[Category] Add Failure',
    FETCH = '[Category] Fetch',
    FETCH_SUCCESS = '[Category] Fetch Success',
    FETCH_FAILURE = '[Category] Fetch Failure',
    UPDATE = '[Category] Update',
    UPDATE_SUCCESS = '[Category] Update Success',
    UPDATE_FAILURE = '[Category] Update Failure',
    DELETE = '[Category] Delete',
    DELETE_SUCCESS = '[Category] Delete Success',
    DELETE_FAILURE = '[Category] Delete Failure'
}

export class Add implements Action {
    readonly type = CategoryActionType.ADD;
    constructor(public category: Category) {}
}

export class AddSuccess implements Action {
    readonly type = CategoryActionType.ADD_SUCCESS;
    constructor(public category: Category) {}
}

export class AddFailure implements Action {
    readonly type = CategoryActionType.ADD_FAILURE;
    constructor(public error: any) {}
}

export class Fetch implements Action {
    readonly type = CategoryActionType.FETCH;
    constructor(public tagId: string) {}
}

export class FetchSuccess implements Action {
    readonly type = CategoryActionType.FETCH_SUCCESS;
    constructor(public list: Category[]) {}
}

export class FetchFailure implements Action {
    readonly type = CategoryActionType.FETCH_FAILURE;
    constructor(public error: any) {}
}

export class Update implements Action {
    readonly type = CategoryActionType.UPDATE;
    constructor(public payload: any) {}
}

export class UpdateSuccess implements Action {
    readonly type = CategoryActionType.UPDATE_SUCCESS;
    constructor(public payload: any) {}
}

export class UpdateFailure implements Action {
    readonly type = CategoryActionType.UPDATE_FAILURE;
    constructor(public error: any) {}
}

export class Delete implements Action {
    readonly type = CategoryActionType.DELETE;
    constructor(public categoryId: string) {}
}

export class DeleteSuccess implements Action {
    readonly type = CategoryActionType.DELETE_SUCCESS;
    constructor(public payload: any) {}
}

export class DeleteFailure implements Action {
    readonly type = CategoryActionType.DELETE_FAILURE;
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