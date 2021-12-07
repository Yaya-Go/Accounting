import { Action } from '@ngrx/store';
import { Transaction } from 'src/app/config/interfaces';

export enum TransactionsActionType {
    ADD_TRANSACTION = '[Transactions] Add',
    ADD_TRANSACTION_SUCCESS = '[Transactions] Add Success',
    ADD_TRANSACTION_FAILURE = '[Transactions] Add Failure',
    GET_TRANSACTION = '[Transactions] Get',
    GET_TRANSACTION_SUCCESS = '[Transactions] Get Success',
    GET_TRANSACTION_FAILURE = '[Transactions] Get Failure',
    FETCH_TRANSACTION = '[Transactions] Fetch',
    FETCH_TRANSACTION_SUCCESS = '[Transactions] Fetch Success',
    FETCH_TRANSACTION_FAILURE = '[Transactions] Fetch Failure',
    UPDATE_TRANSACTION = '[Transactions] Update',
    UPDATE_TRANSACTION_SUCCESS = '[Transactions] Update Success',
    UPDATE_TRANSACTION_FAILURE = '[Transactions] Update Failure',
    DELETE_TRANSACTION = '[Transactions] Delete',
    DELETE_TRANSACTION_SUCCESS = '[Transactions] Delete Success',
    DELETE_TRANSACTION_FAILURE = '[Transactions] Delete Failure'
}

export class AddTransaction implements Action {
    readonly type = TransactionsActionType.ADD_TRANSACTION;
    constructor(public trans: Transaction) {}
}

export class AddTransactionSuccess implements Action {
    readonly type = TransactionsActionType.ADD_TRANSACTION_SUCCESS;
    constructor(public trans: Transaction) {}
}

export class AddTransactionFailure implements Action {
    readonly type = TransactionsActionType.ADD_TRANSACTION_FAILURE;
    constructor(public error: any) {}
}

export class GetTransaction implements Action {
    readonly type = TransactionsActionType.GET_TRANSACTION;
    constructor(public transId: string) {}
}

export class GetTransactionSuccess implements Action {
    readonly type = TransactionsActionType.GET_TRANSACTION_SUCCESS;
    constructor(public trans: Transaction) {}
}

export class GetTransactionFailure implements Action {
    readonly type = TransactionsActionType.GET_TRANSACTION_FAILURE;
    constructor(public error: any) {}
}

export class FetchTransaction implements Action {
    readonly type = TransactionsActionType.FETCH_TRANSACTION;
    constructor() {}
}

export class FetchTransactionSuccess implements Action {
    readonly type = TransactionsActionType.FETCH_TRANSACTION_SUCCESS;
    constructor(public trans: Transaction[]) {}
}

export class FetchTransactionFailure implements Action {
    readonly type = TransactionsActionType.FETCH_TRANSACTION_FAILURE;
    constructor(public error: any) {}
}

export class UpdateTransaction implements Action {
    readonly type = TransactionsActionType.UPDATE_TRANSACTION;
    constructor(public payload: any) {}
}

export class UpdateTransactionSuccess implements Action {
    readonly type = TransactionsActionType.UPDATE_TRANSACTION_SUCCESS;
    constructor(public payload: any) {}
}

export class UpdateTransactionFailure implements Action {
    readonly type = TransactionsActionType.UPDATE_TRANSACTION_FAILURE;
    constructor(public error: any) {}
}

export class DeleteTransaction implements Action {
    readonly type = TransactionsActionType.DELETE_TRANSACTION;
    constructor(public transId: string) {}
}

export class DeleteTransactionSuccess implements Action {
    readonly type = TransactionsActionType.DELETE_TRANSACTION_SUCCESS;
    constructor(public payload: any) {}
}

export class DeleteTransactionFailure implements Action {
    readonly type = TransactionsActionType.DELETE_TRANSACTION_FAILURE;
    constructor(public error: any) {}
}

export type ActionsUnion = 
    AddTransaction |
    AddTransactionSuccess |
    AddTransactionFailure |
    GetTransaction |
    GetTransactionSuccess |
    GetTransactionFailure |
    FetchTransaction |
    FetchTransactionSuccess |
    FetchTransactionFailure |
    UpdateTransaction |
    UpdateTransactionSuccess |
    UpdateTransactionFailure |
    DeleteTransaction |
    DeleteTransactionSuccess |
    DeleteTransactionFailure;