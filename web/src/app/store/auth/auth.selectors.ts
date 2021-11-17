import { createFeatureSelector, createSelector, select } from "@ngrx/store";
import { AppState } from "../app.state";
import { AuthState } from "./auth.reducers";

export const selectAuthState = createFeatureSelector<AppState, AuthState>('auth');

export const getToken = createSelector(selectAuthState, (state: AuthState) => state.token);

export const getUsername = createSelector(selectAuthState, (state: AuthState) => state.username);

export const getEmail = createSelector(selectAuthState, (state: AuthState) => state.email);