import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Exercise} from "../exercise.model";
import {TrainingService} from "../training.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit,AfterViewInit {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sortName: MatSort;
  @ViewChild(MatPaginator) paginatorName: MatPaginator;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.getExercises();
  }

  getExercises(){
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sortName;
    this.dataSource.paginator = this.paginatorName;
  }

  doFilter(filterValue: any){
    this.dataSource.filter = filterValue.target.value.trim().toLocaleLowerCase()
  }

}
