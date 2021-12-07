import { Action } from '@ngrx/store';
import { Category } from 'src/app/config/interfaces';

export enum CategoryActionType {
    ADD_CATEGORY = '[Category] Add',
    ADD_CATEGORY_SUCCESS = '[Category] Add Success',
    ADD_CATEGORY_FAILURE = '[Category] Add Failure',
    FETCH_CATEGORY = '[Category] Fetch',
    FETCH_CATEGORY_SUCCESS = '[Category] Fetch Success',
    FETCH_CATEGORY_FAILURE = '[Category] Fetch Failure',
    UPDATE_CATEGORY = '[Category] Update',
    UPDATE_CATEGORY_SUCCESS = '[Category] Update Success',
    UPDATE_CATEGORY_FAILURE = '[Category] Update Failure',
    DELETE_CATEGORY = '[Category] Delete',
    DELETE_CATEGORY_SUCCESS = '[Category] Delete Success',
    DELETE_CATEGORY_FAILURE = '[Category] Delete Failure'
}

export class AddCategory implements Action {
    readonly type = CategoryActionType.ADD_CATEGORY;
    constructor(public category: Category) {}
}

export class AddCategorySuccess implements Action {
    readonly type = CategoryActionType.ADD_CATEGORY_SUCCESS;
    constructor(public category: Category) {}
}

export class AddCategoryFailure implements Action {
    readonly type = CategoryActionType.ADD_CATEGORY_FAILURE;
    constructor(public error: any) {}
}

export class FetchCategory implements Action {
    readonly type = CategoryActionType.FETCH_CATEGORY;
    constructor(public tagId: string) {}
}

export class FetchCategorySuccess implements Action {
    readonly type = CategoryActionType.FETCH_CATEGORY_SUCCESS;
    constructor(public list: Category[]) {}
}

export class FetchCategoryFailure implements Action {
    readonly type = CategoryActionType.FETCH_CATEGORY_FAILURE;
    constructor(public error: any) {}
}

export class UpdateCategory implements Action {
    readonly type = CategoryActionType.UPDATE_CATEGORY;
    constructor(public payload: any) {}
}

export class UpdateCategorySuccess implements Action {
    readonly type = CategoryActionType.UPDATE_CATEGORY_SUCCESS;
    constructor(public payload: any) {}
}

export class UpdateCategoryFailure implements Action {
    readonly type = CategoryActionType.UPDATE_CATEGORY_FAILURE;
    constructor(public error: any) {}
}

export class DeleteCategory implements Action {
    readonly type = CategoryActionType.DELETE_CATEGORY;
    constructor(public categoryId: string) {}
}

export class DeleteCategorySuccess implements Action {
    readonly type = CategoryActionType.DELETE_CATEGORY_SUCCESS;
    constructor(public payload: any) {}
}

export class DeleteCategoryFailure implements Action {
    readonly type = CategoryActionType.DELETE_CATEGORY_FAILURE;
    constructor(public error: any) {}
}

export type ActionsUnion = 
    AddCategory |
    AddCategorySuccess |
    AddCategoryFailure |
    FetchCategory |
    FetchCategorySuccess |
    FetchCategoryFailure |
    UpdateCategory |
    UpdateCategorySuccess |
    UpdateCategoryFailure |
    DeleteCategory |
    DeleteCategorySuccess |
    DeleteCategoryFailure;