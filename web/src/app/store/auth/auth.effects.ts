import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { User } from "src/app/config/interfaces";
import * as authAction from "./auth.actions";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

    
    Login: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(authAction.AuthActionType.LOGIN),
        map((action: authAction.Login) => action.payload),
        switchMap((payload: any) => {
          localStorage.setItem('remember', JSON.stringify(payload.remember));
          if (payload.remember) {
            localStorage.setItem('password', payload.password);
          }
          return this.authService.Login(payload.email, payload.password)
            .pipe(
              map(res => { return new authAction.LoginSuccess(res); }),
              catchError(err => { return of(new authAction.LoginFailure(err)); })
            );
        })
    ))

    
    LoginSuccess: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(authAction.AuthActionType.LOGIN_SUCCESS),
        map((action: authAction.LoginSuccess) => action.payload.data),
        switchMap((data: any) => {
            localStorage.setItem('token', data.token);
            const remember = localStorage.getItem('remember') === 'true' ? true : false;
            if (remember) {
                localStorage.setItem('email', data.email);
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }

            return this.router.navigateByUrl('', { replaceUrl: true });
        })
    ), { dispatch: false })

    
    Register: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(authAction.AuthActionType.REGISTER),
        map((action: authAction.Register) => action.payload),
        switchMap((payload: any) => {
            return this.authService.Register(payload as User)
              .pipe(
                map(res => { return new authAction.RegisterSuccess(res); }),                
                catchError(err => { return of(new authAction.RegisterFailure(err)); })
              );
        })
    ))

    
    RegisterSuccess: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(authAction.AuthActionType.REGISTER_SUCCESS),
        map((action: authAction.RegisterSuccess) => action.payload.data),
        switchMap((payload: any) => {
            localStorage.setItem('token', payload.token);
            return this.router.navigateByUrl('', { replaceUrl: true });
        })
    ), { dispatch: false })

    
    Logout: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(authAction.AuthActionType.LOGOUT),
        switchMap(() => {
            localStorage.removeItem('token');
            return this.router.navigateByUrl('/auth/login', { replaceUrl: true });
        })
    ), { dispatch: false })
}