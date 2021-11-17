import { Action } from '@ngrx/store';

export enum AuthActionType {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',
    REGISTER = '[Auth] Register',
    REGISTER_SUCCESS = '[Auth] Register Success',
    REGISTER_FAILURE = '[Auth] Register Failure',
    LOGOUT = '[Auth] Logout'
}

export class Login implements Action {
    readonly type = AuthActionType.LOGIN;
    constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
    readonly type = AuthActionType.LOGIN_SUCCESS;
    constructor(public payload: any) {}
}

export class LoginFailure implements Action {
    readonly type = AuthActionType.LOGIN_FAILURE;
    constructor(public payload: any) {}
}

export class Register implements Action {
    readonly type = AuthActionType.REGISTER;
    constructor(public payload: any) {}
}

export class RegisterSuccess implements Action {
    readonly type = AuthActionType.REGISTER_SUCCESS;
    constructor(public payload: any) {}
}

export class RegisterFailure implements Action {
    readonly type = AuthActionType.REGISTER_FAILURE;
    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = AuthActionType.LOGOUT;
    constructor() {}
}

export type AuthUnions = 
    Login |
    LoginSuccess |
    LoginFailure |
    Register |
    RegisterSuccess |
    RegisterFailure |
    Logout;