import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../config/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  Login (email: string, password: string) {
    return this.http.post(`${ this.API }/auth/login`, { email, password });
  }

  Register (user: User) {
    return this.http.post(`${ this.API }/auth/register`, user);
  }

  GetToken () {
    return localStorage.getItem('token');
  }
}
