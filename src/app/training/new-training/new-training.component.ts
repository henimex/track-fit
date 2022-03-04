import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from "../exercise.model";
import { TrainingService } from "../training.service";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  //@Output() trainingStart = new EventEmitter<void>();
  exercises: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private dbFireStore: AngularFirestore
    ) { }

  ngOnInit(): void {
    this.getExercises();
    this.getExercisesWithFire();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exerciseFromHtml)
  }

  getExercises(){
    //this.exercises = this.trainingService.getExercises();
  }

  getExercisesWithFireDep(){
    this.dbFireStore.collection('availableExercises').valueChanges().subscribe(response => {
      console.log(response)
    })
  }

  getExercisesWithFire(){
    this.exercises = this.dbFireStore.collection('availableExercises').valueChanges();
  }
}
