import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { StopTrainingComponent } from "./stop-training/stop-training.component";

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit = new EventEmitter();
  progress: number = 0;
  timer: number = 0;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initProgressBar();
  }

  initProgressBar() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 1

      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 100)
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      width:'350px',
      height:'250px',
      data: {
        progress: this.progress
      }
    })

    dialogRef.afterClosed().subscribe(result=>{
      console.log(result)
      if (result){
        this.trainingExit.emit();
      } else if (!result){
        this.initProgressBar()
      }
    })
  }

  onPause() {

  }

  onCancel() {

  }

}
