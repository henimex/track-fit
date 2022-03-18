import { Injectable } from '@angular/core';
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TrainingService} from "../training/training.service";
import { UIService } from "../shared/ui.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthStatus: boolean = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService
  ) { }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result=>{
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.uiService.showSnackBar(error.message, 'Register Error');
        this.uiService.loadingStateChanged.next(false);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiService.loadingStateChanged.next(false);
      })
      .catch(error => {
        this.uiService.showSnackBar(error.message,'Login Failed');
        this.uiService.loadingStateChanged.next(false);
        console.log(error.errorCode)
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
        this.router.navigate(['/login']).then(result => {
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
