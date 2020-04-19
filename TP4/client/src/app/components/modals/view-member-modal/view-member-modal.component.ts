import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ViewMovieModalComponent } from '../view-movie-modal/view-movie-modal.component';
import { Membre } from '../../../models/Membre';

export interface DialogData {
  membre: Membre;
}

@Component({
  selector: 'app-view-member-modal',
  templateUrl: './view-member-modal.component.html',
  styleUrls: ['./view-member-modal.component.scss']
})
export class ViewMemberModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialogRef<ViewMovieModalComponent>) { }

  ngOnInit() {
    console.log(this.data.membre);
  }

  close() {
    this.dialogRef.close();
  }
}
