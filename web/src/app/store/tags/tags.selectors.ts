import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { TagState } from "./tags.reducers";

export const selectTagState = createFeatureSelector<AppState, TagState>('tag');

export const getTags = createSelector(selectTagState, (state: TagState) => state.tags);

export const getError = createSelector(selectTagState, (state: TagState) => state.error);

export const getLoading = createSelector(selectTagState, (state: TagState) => state.isLoading);
