import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavCloser = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  closeSidenav(){
    this.sidenavCloser.emit();
  }

}