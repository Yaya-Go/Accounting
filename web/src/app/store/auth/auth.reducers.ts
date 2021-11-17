import * as fromActions from './auth.actions';

export interface AuthState {
  email: string;
  username: string;
  token: string;
  userId: string;
  loading: boolean;
}

export const initAuthState: AuthState = {
    email: '',
    username: '',
    token: '',
    userId: '',
    loading: false
}

export function authReducer(state = initAuthState, action: fromActions.AuthUnions): AuthState {
    const cloneState = Object.assign({}, state);

    switch (action.type) {
        case fromActions.AuthActionType.LOGIN:
            cloneState.loading = true;
            return cloneState;
        case fromActions.AuthActionType.LOGIN_SUCCESS:
            cloneState.loading = false;
            cloneState.email = action.payload.email;            
            cloneState.username = action.payload.username;
            cloneState.token = action.payload.token;
            cloneState.userId = action.payload.userId;
            return cloneState;
        case fromActions.AuthActionType.LOGIN_FAILURE:
            cloneState.loading = false;
            localStorage.removeItem('password');
            return initAuthState;
        case fromActions.AuthActionType.REGISTER:
            cloneState.loading = true;
            return cloneState;
        case fromActions.AuthActionType.REGISTER_SUCCESS:
            cloneState.loading = false;
            cloneState.email = action.payload.email;
            cloneState.username = action.payload.username;
            cloneState.token = action.payload.token;
            cloneState.userId = action.payload.userId; 
            return cloneState;
        case fromActions.AuthActionType.REGISTER_FAILURE:
            cloneState.loading = false;         
            return initAuthState;
        case fromActions.AuthActionType.LOGOUT:
            cloneState.loading = false;
            return initAuthState;
        default:
            return cloneState;
    }
}