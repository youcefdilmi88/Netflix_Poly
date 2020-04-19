import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ViewMovieModalComponent } from '../view-movie-modal/view-movie-modal.component';
import { Membre } from 'src/app/models/Membre';

export interface DialogData {
  member: Membre;
}

@Component({
  selector: 'app-view-member-modal',
  templateUrl: './view-member-modal.component.html',
  styleUrls: ['./view-member-modal.component.scss']
})
export class ViewMemberModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialogRef<ViewMovieModalComponent>) { }

  ngOnInit() {
    console.log(this.data);
  }

  close() {
    this.dialogRef.close();
  }
}
