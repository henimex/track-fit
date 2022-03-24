import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {MaterialModule} from "./material.module";
import {WelcomeComponent} from './welcome/welcome.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {AuthService} from "./auth/auth.service";
import {TrainingService} from "./training/training.service";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {UIService} from "./shared/ui.service";
import {AuthModule} from "./auth/auth.module";
import {TrainingModule} from "./training/training.module";
import {StoreModule} from '@ngrx/store';
import {appReducer} from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    TrainingModule,
    AuthModule,
    StoreModule.forRoot({ui: appReducer}),
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
