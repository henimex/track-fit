import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Exercise } from "../exercise.model";
import { TrainingService } from "../training.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  //@Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[];

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.getExercises();
  }

  onStartTraining(form: NgForm) {
    console.log("test")
    this.trainingService.startExercise(form.value.exerciseFromHtml)
  }

  getExercises(){
    this.exercises = this.trainingService.getExercises();
    console.log(this.exercises);
  }
}
