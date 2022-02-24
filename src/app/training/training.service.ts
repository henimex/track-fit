import { Injectable } from '@angular/core';
import { Exercise } from "./exercise.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ]

  private runningExercise: Exercise;
  private exercises: Exercise[] = [];
  exerciseChanged = new Subject<Exercise>()

  constructor() {
  }

  getExercises() {
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string) {
    // @ts-ignore
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId)
    this.exerciseChanged.next({ ...this.runningExercise })
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  completeExercise() {
    this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' });
    // @ts-ignore
    this.runningExercise = null;

    // @ts-ignore
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.duration * (progress / 100),
      state: 'cancelled'
    });

    // @ts-ignore
    this.runningExercise = null;

    // @ts-ignore
    this.exerciseChanged.next(null);
  }
}
