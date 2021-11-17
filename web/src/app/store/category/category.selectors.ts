import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CategoryState } from "./category.reducers";

export const selectCategoryState = createFeatureSelector<AppState, CategoryState>('category');

export const getList = createSelector(selectCategoryState, (state: CategoryState) => state.list);

export const getError = createSelector(selectCategoryState, (state: CategoryState) => state.error);

export const getLoading = createSelector(selectCategoryState, (state: CategoryState) => state.isLoading);
