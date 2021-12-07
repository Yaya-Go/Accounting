import { Transaction, Item } from "src/app/config/interfaces";
import { ActionsUnion, TransactionsActionType } from "./transaction.actions";

export interface TransState {
    isLoading: boolean;
    error: any;
    message: string;
    transactions: Transaction[];
    trans: Transaction | null;
    items: Item[]
}

export const initialTransState: TransState = {
    isLoading: false,
    message: '',
    error: null,
    transactions: [],
    trans: null,
    items: []
}

export function transReducer(state = initialTransState, action: ActionsUnion): TransState {
    const cloneState = Object.assign({}, state);

    switch (action.type) {
        case TransactionsActionType.ADD_TRANSACTION:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case TransactionsActionType.ADD_TRANSACTION_SUCCESS:
            cloneState.isLoading = false;
            return cloneState;
        case TransactionsActionType.ADD_TRANSACTION_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        case TransactionsActionType.GET_TRANSACTION:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case TransactionsActionType.ADD_TRANSACTION_SUCCESS:
            cloneState.isLoading = false;
            cloneState.trans = action.trans;
            return cloneState;
        case TransactionsActionType.ADD_TRANSACTION_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        case TransactionsActionType.UPDATE_TRANSACTION:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case TransactionsActionType.UPDATE_TRANSACTION_SUCCESS:
            cloneState.isLoading = false;
            return cloneState;
        case TransactionsActionType.UPDATE_TRANSACTION_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        case TransactionsActionType.DELETE_TRANSACTION:
            cloneState.isLoading = true;
            cloneState.error = null;
            cloneState.message = '';
            return cloneState;
        case TransactionsActionType.DELETE_TRANSACTION_SUCCESS:
            cloneState.isLoading = false;
            return cloneState;
        case TransactionsActionType.DELETE_TRANSACTION_FAILURE:
            cloneState.isLoading = false;
            cloneState.error = action.error;
            return cloneState;
        default:
            return cloneState;
    }
}