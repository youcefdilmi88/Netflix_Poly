import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-participant-modal',
  templateUrl: './add-participant-modal.component.html',
  styleUrls: ['./add-participant-modal.component.scss']
})
export class AddParticipantModalComponent implements OnInit {

  constructor(public errorDialog: MatDialog, private dialogRef: MatDialogRef<AddParticipantModalComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
