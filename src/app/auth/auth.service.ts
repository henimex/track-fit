import { Injectable } from '@angular/core';
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TrainingService} from "../training/training.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthStatus: boolean = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService
  ) { }

  registerUser(authData: AuthData) {
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result=>{

      })
      .catch(error => {
        console.log(error)
      });
  }

  login(authData: AuthData) {
    this.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {

      })
      .catch(error => {
        console.log(error)
      });
  }

  initAuthListener(){
    this.auth.authState.subscribe(user => {
      if (user){
        this.isAuthStatus = true;
        this.authChange.next(true);
        this.router.navigate(['/training']).then(result => {
          console.log('Navigate Result', result);
        });
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/welcome']).then(result => {
          console.log('Navigate Result', result);
        });
        this.isAuthStatus = false;
      }
    })
  }

  logout() {
    this.auth.signOut();
  }

  getUser() {
    return null;
  }

  isAuth() {
    return this.isAuthStatus;
  }

}
