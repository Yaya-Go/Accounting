import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Logout } from '../store/auth';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError(err => {
        if (err.status || (err.error && err.error.error && err.error.error.code === 'auth/id-token-expired')) {
          this.store.dispatch(new Logout());
        }
        return throwError(err);
      }));
  }
}
