import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Movie } from 'src/app/models/Movie';
import { Participant } from 'src/app/models/participant';
import { Nomination } from 'src/app/models/nomination';

export interface DialogData {
  movie: Movie;
  distribution: Participant[];
  nominations: Nomination[];
}

@Component({
  selector: 'app-view-movie-modal',
  templateUrl: './view-movie-modal.component.html',
  styleUrls: ['./view-movie-modal.component.scss']
})
export class ViewMovieModalComponent implements OnInit {

  hours: number = Math.floor(this.data.movie.duree_totale_min / 60);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialogRef<ViewMovieModalComponent>) { }


  containsPrimaire: boolean = false;
  containsSecondaire: boolean = false;
  containsAuteur: boolean = false;
  containsRealisateur: boolean = false;
  containsNominations: boolean = false;

  ngOnInit() {
    this.containsPrimaire = this.containsRole("primaire");
    this.containsSecondaire = this.containsRole("secondaire");
    this.containsAuteur = this.containsRole("auteur");
    this.containsRealisateur = this.containsRole("realisateur");
    this.containsNominations = this.data.nominations.length > 0 ? true : false;

  }


  containsRole(role: string){
    return this.data.distribution.find((participant) => participant.role_employe === role) ? true : false;
  }

  close() {
    this.dialogRef.close();
  }

  watch() {
    this.dialogRef.close();
  }

}
