import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {

  @Output() sidenavCloser = new EventEmitter<void>();

  authSubscription:Subscription;
  isAuth:boolean;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(status => {
      this.isAuth = status
    })
  }

  closeSidenav(){
    this.sidenavCloser.emit();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
