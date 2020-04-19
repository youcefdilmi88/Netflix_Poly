import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { CommunicationService } from '../../../services/communication-service/communication.service';
import { Movie } from '../../../models/Movie';

export interface DialogData {
  ID_film: number;
  title: string;
  genre: string;
  duration: number;
  prodYear: number;
}

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  id: number = this.data.ID_film;
  newTitle: string = this.data.title;
  newGenre: string = this.data.genre;
  newDuration: number = this.data.duration;
  newProdYear: number = this.data.prodYear;
  genres: string[] = ["Action", "Animation", "Comédie", "Documentaire", "Drame", "Fantastique", "Historique", "Policier", "Science-fiction", "Sport", "Crime"];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public errorDialog: MatDialog, private dialogRef: MatDialogRef<EditModalComponent>, private communicationService: CommunicationService) {}

  ngOnInit() {}

  confirmEdit() {
    if(this.newTitle !== "" && this.newDuration > 0 && this.newProdYear > 1890) {
      this.editMovie(this.id, this.newTitle, this.newGenre, this.newProdYear, this.newDuration);
      this.dialogRef.close();

    } else {
      this.errorDialog.open(ErrorModalComponent, {
        data: "Veuillez entrer des valeurs valides!"
      });
    }
  }


  public editMovie(ID_film: number, titre: string, genre: string, annee_prod: number, duree_totale_min: number): void {
    const updatedMovie: Movie = {
        "ID_film": ID_film,
        "titre" : titre,
        "genre" : genre,
        "annee_prod" : annee_prod,
        "duree_totale_min" : duree_totale_min,

    };
    this.communicationService.editMovie(updatedMovie).subscribe((res: number) => {
        console.log(res);
        if (res > 0) {
            this.communicationService.filter("update");
        }
    });
  }

}
