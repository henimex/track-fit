import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Exercise} from "../exercise.model";
import {TrainingService} from "../training.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSub: Subscription;

  @ViewChild(MatSort) sortName: MatSort;
  @ViewChild(MatPaginator) paginatorName: MatPaginator;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.getExercises();
    this.subToExercises();
  }

  getExercises() {
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  subToExercises() {
    this.exChangedSub = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises
      // let data = exercises
      // exercises.sort((a,b)=> new Date(b.date!).getTime() - new Date(a.date!).getTime())
      // console.log(data)
      // this.dataSource.data = data;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sortName;
    this.dataSource.paginator = this.paginatorName;
  }

  doFilter(filterValue: any) {
    this.dataSource.filter = filterValue.target.value.trim().toLocaleLowerCase()
  }

  ngOnDestroy(): void {
    if (this.exChangedSub) {
      this.exChangedSub.unsubscribe();
    }
  }

}
