import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TagState } from "./tags.reducers";

export const selectTagState = createFeatureSelector< TagState>('tag');

export const getTags = createSelector(selectTagState, (state: TagState) => state.tags);

export const getTag = createSelector(selectTagState, (state: TagState) => state.tag);

export const getCategory = createSelector(selectTagState, (state: TagState) => state.category);

export const getError = createSelector(selectTagState, (state: TagState) => state.error);

export const getLoading = createSelector(selectTagState, (state: TagState) => state.isLoading);
