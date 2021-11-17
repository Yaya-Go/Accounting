import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AUTH_TYPE } from '../config/enum';
import { AppState } from '../store/app.state';
import { Login, Register } from '../store/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  readonly AUTH_TYPE = AUTH_TYPE;
  type: string;

  public loginForm: any = {
    email: '',
    password: '',
    remember: false
  };
  public registerForm: any = {
    email: '',
    username: '',
    password: ''
  };

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.type = route.snapshot.url[0].path;
    this.loginForm.remember = localStorage.getItem('remember') === 'true' ? true : false;
    if (this.loginForm.remember) {
        this.loginForm.email = localStorage.getItem('email') || '';
        this.loginForm.password = localStorage.getItem('password') || '';
    }
  }

  ngOnInit(): void {
  }

  login(): void {
    if (!this.loginForm.email || !this.loginForm.password) return;

    this.store.dispatch(new Login(this.loginForm));
  }

  register(): void {
    if (!this.registerForm.email || !this.registerForm.username || !this.registerForm.password) return;

    this.store.dispatch(new Register(this.registerForm));
  }

}
