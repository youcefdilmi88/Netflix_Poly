import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { } from '../edit-modal/edit-modal.component';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { Movie } from '../../../models/Movie';
import { CommunicationService } from '../../../services/communication-service/communication.service';



@Component({
  selector: 'app-add-movie-modal',
  templateUrl: './add-movie-modal.component.html',
  styleUrls: ['./add-movie-modal.component.scss']
})
export class AddMovieModalComponent implements OnInit {
  newTitle: string = "";
  newGenre: string = "";
  newDuration: number;
  newProdYear: number;
  genres: string[] = ["Action", "Animation", "Comédie", "Documentaire", "Drame", "Fantastique", "Historique", "Policier", "Science-fiction", "Sport", "Crime"];

  constructor(public errorDialog: MatDialog, private dialogRef: MatDialogRef<AddMovieModalComponent>, private communicationService: CommunicationService) {}

  ngOnInit() {}


  confirmAdd() {
    if(this.newTitle !== "" && this.newDuration > 0 && this.newProdYear > 1890) {
      this.insertMovie(this.newTitle, this.newGenre, this.newProdYear, this.newDuration);
      this.dialogRef.close();
    } else {
      this.errorDialog.open(ErrorModalComponent, {
        data: "Veuillez entrer des valeurs valides!"
      });
    }
  }


  public insertMovie(titre: string, genre: string, annee_prod: number, duree_totale_min: number): void {
    const newMovie: Movie = {
        "titre" : titre,
        "genre" : genre,
        "annee_prod" : annee_prod,
        "duree_totale_min" : duree_totale_min,

    };
    this.communicationService.insertMovie(newMovie).subscribe((res: number) => {
        console.log(res);
        if (res > 0) {
            this.communicationService.filter("update");
        }
    });
  }




}

