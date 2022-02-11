import { Injectable } from '@angular/core';
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
    this.authSuccessful('/training')
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
    this.authChange.next(true);
    this.authSuccessful('/training')
  }

  logout() {
    this.user = {
      email: "",
      userId: ""
    }
    this.authChange.next(false);
    this.authSuccessful('/welcome')
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessful(pageNam: string){
    this.router.navigate([pageNam]);
  }
}
