import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
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

    @Effect()
    Login: Observable<any> = this.actions$.pipe(
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
    )

    @Effect({ dispatch: false })
    LoginSuccess: Observable<any> = this.actions$.pipe(
        ofType(authAction.AuthActionType.LOGIN_SUCCESS),
        map((action: authAction.LoginSuccess) => action.payload.user),
        switchMap((user: any) => {
            localStorage.setItem('token', user.token);
            const remember = localStorage.getItem('remember') === 'true' ? true : false;
            if (remember) {
                localStorage.setItem('email', user.email);
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('password');
            }

            return this.router.navigateByUrl('', { replaceUrl: true });
        })
    )

    @Effect()
    Register: Observable<any> = this.actions$.pipe(
        ofType(authAction.AuthActionType.REGISTER),
        map((action: authAction.Register) => action.payload),
        switchMap((payload: any) => {
            return this.authService.Register(payload as User)
              .pipe(
                map(res => { return new authAction.RegisterSuccess(res); }),                
                catchError(err => { return of(new authAction.RegisterFailure(err)); })
              );
        })
    )

    @Effect({ dispatch: false })
    RegisterSuccess: Observable<any> = this.actions$.pipe(
        ofType(authAction.AuthActionType.REGISTER_SUCCESS),
        map((action: authAction.RegisterSuccess) => action.payload),
        switchMap((payload: any) => {
            localStorage.setItem('token', payload.token);
            return this.router.navigateByUrl('', { replaceUrl: true });
        })
    )

    @Effect({ dispatch: false })
    Logout: Observable<any> = this.actions$.pipe(
        ofType(authAction.AuthActionType.LOGOUT),
        switchMap(() => {
            localStorage.removeItem('token');
            return this.router.navigateByUrl('/auth/login', { replaceUrl: true });
        })
    )
}