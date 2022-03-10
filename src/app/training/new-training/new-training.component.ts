import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Exercise} from "../exercise.model";
import {TrainingService} from "../training.service";
import {NgForm} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable, Subscription} from "rxjs";


//import { map } from "rxjs/operators";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  //@Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private dbFireStore: AngularFirestore
  ) { }

  ngOnInit(): void {
    //this.getExercises();
    //this.getExercisesWithFireV3();
    this.getDataWithId();
  }

  getDataWithId() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises
    });
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exerciseFromHtml)
  }

  getExercises() {
    //this.exercises = this.trainingService.getExercises();
  }

  getExercisesWithFire() {
    //this.exercises = this.dbFireStore.collection('availableExercises').valueChanges();
  }

  //Tests
  getExercisesWithFireV3() {
    this.dbFireStore.collection('availableExercises').valueChanges().subscribe(response => {
      console.log('Value Changes ', response);
    })

    this.dbFireStore.collection('availableExercises').snapshotChanges().subscribe(response => {
      console.log('Snapshot Changes ', response);
    });

    this.dbFireStore.collection('availableExercises').snapshotChanges().subscribe(response => {
      console.log('Snapshot Changes With Data')
      for (const res of response) {
        console.log(res.payload.doc.data());
      }
    });

    this.dbFireStore.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() as object)
            //...doc.payload.doc.data() as {} //alternative
          }
        })
      })).subscribe(result => {
      console.log('Mapping ID : ', result)
    })
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }
}
