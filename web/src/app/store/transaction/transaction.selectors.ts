import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TransState } from "./transaction.reducers";

export const selectTransState = createFeatureSelector<TransState>('transaction');

export const getTransaction = createSelector(selectTransState, (state: TransState) => state.trans);
