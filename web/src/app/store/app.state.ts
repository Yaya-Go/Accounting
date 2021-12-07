import { ActionReducerMap } from "@ngrx/store";
import * as fromTag from './tags';
import * as fromAuth from './auth';
import * as fromCategory from './category';
import * as fromTrans from './transaction';

export interface AppState {
    tag: fromTag.TagState,
    auth: fromAuth.AuthState,
    category: fromCategory.CategoryState,
    trans: fromTrans.TransState
}

export const reducers: ActionReducerMap<AppState, any> = {
    tag: fromTag.tagReducer,
    auth: fromAuth.authReducer,
    category: fromCategory.categoryReducer,
    trans: fromTrans.transReducer
};

export const effects = [
    fromTag.TagsEffects,
    fromAuth.AuthEffects,
    fromCategory.CategoryEffects,
    fromTrans.TransactionEffects
]