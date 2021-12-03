import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private whiteList = [
    '/auth/login',
    '/auth/register'
  ];

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {            
    const token = localStorage.getItem('token');
    if (this.whiteList.indexOf(this.router.url) === -1) {
        request = request.clone({
            setHeaders: {
              Authorization: `YYG-Account ${ token }`
            }
          });
    }
      
    return next.handle(request);
  }
}
