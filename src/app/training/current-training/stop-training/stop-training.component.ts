import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-stop-training',
  templateUrl: './stop-training.component.html',
  styleUrls: ['./stop-training.component.css']
})
export class StopTrainingComponent implements OnInit {

  progressFromCurrentTraining: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) private passedData: any) {
  }

  ngOnInit(): void {
    console.log(this.passedData)
    this.receiveData()
  }

  receiveData(){
    this.progressFromCurrentTraining = this.passedData.progress
  }
}
