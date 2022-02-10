import { Injectable } from '@angular/core';
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // @ts-ignore
  private user: User;

  constructor() {
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    }
  }

  logout() {
    this.user = {
      email: "",
      userId: ""
    }
  }

  getUser(){
    return { ...this.user };
  }

  isAuth(){
    let userId = Number(this.user.userId)
    return userId > 0
  }

}
