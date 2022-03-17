import {Injectable} from '@angular/core';
import {Exercise} from "./exercise.model";
import {map, Subject, Subscription} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {UIService} from "../shared/ui.service";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private availableExercises: Exercise[] = []
  private fbSubs: Subscription[] = [];
  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(
    private dbFireStore: AngularFirestore,
    private uiService: UIService) { }

  fetchAvailableExercises() {
    this.fbSubs.push(this.dbFireStore.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: (doc.payload.doc.data() as Exercise).name,
            duration: (doc.payload.doc.data() as Exercise).duration,
            calories: (doc.payload.doc.data() as Exercise).calories
          }
        })
      }))
      .subscribe((exercises: Exercise[]) => {
        this.uiService.loadingStateChanged.next(false);
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }, error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar('Fetching Exercises Failed','Fetch Error');
        // @ts-ignore
        this.exercisesChanged.next(null);
      }));
  }

  private addData(exercise: Exercise) {
    this.dbFireStore.collection('finishedExercises').add(exercise);
  }

  startExercise(selectedId: string) {
    //this.dbFireStore.doc('availableExercises/' + selectedId).update({lastSelected: new Date()})
    // @ts-ignore
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId)
    this.exerciseChanged.next({...this.runningExercise})
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  completeExercise() {
    this.addData({...this.runningExercise, date: new Date(), state: 'completed'});
    // @ts-ignore
    this.runningExercise = null;

    // @ts-ignore
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addData({
      ...this.runningExercise,
      date: new Date(),
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      state: 'cancelled'
    });

    // @ts-ignore
    this.runningExercise = null;

    // @ts-ignore
    this.exerciseChanged.next(null);
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.dbFireStore
      .collection('finishedExercises')
      .valueChanges()
      // @ts-ignore
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
}
