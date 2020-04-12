import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Movie } from 'src/app/movie';
import { Participant } from 'src/app/participant';
import { Nomination } from 'src/app/nomination';

export interface DialogData {
  movie: Movie;
  participants: Participant[];
  nominations: Nomination[];
}

@Component({
  selector: 'app-view-movie-modal',
  templateUrl: './view-movie-modal.component.html',
  styleUrls: ['./view-movie-modal.component.scss']
})
export class ViewMovieModalComponent implements OnInit {

  hours: number = Math.floor(this.data.movie.duration / 60);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialogRef<ViewMovieModalComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  watch() {
    this.dialogRef.close();
  }

}
