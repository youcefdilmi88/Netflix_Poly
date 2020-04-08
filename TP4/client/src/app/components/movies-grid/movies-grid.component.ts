import { Component, OnInit } from '@angular/core';
import { Classification } from '../../classification';
import { SortType } from 'src/app/enums';
import { Movie } from '../../../../../common/tables/Movie';
import { MatDialog } from '@angular/material';
import { EditModalComponent } from '../modals/edit-modal/edit-modal.component';
import { ViewMovieModalComponent } from '../modals/view-movie-modal/view-movie-modal.component';
import { CommunicationService } from '../services/communication-service/communication.service';
import { MemberService } from "../services/member-service/memberService";
import { Membre } from "../../Membre";


@Component({
  selector: 'app-movies-grid',
  templateUrl: './movies-grid.component.html',
  styleUrls: ['./movies-grid.component.scss']
})
export class MoviesGridComponent implements OnInit {
  SortType = SortType;

  title: Classification = new Classification("Titre", this.SortType.none);
  genre: Classification = new Classification("Genre", this.SortType.none);
  duration: Classification = new Classification("Durée (min)", this.SortType.none);
  //director: Classification = new Classification("Réalisateur", this.SortType.none);
  prodYear: Classification = new Classification("Année de production", this.SortType.none);
  classifications: Classification[] = [this.title, this.genre, this.duration /*,this.director*/, this.prodYear];
  movies : Movie[] = [/*{id: 1, title: 'Titanic', genre: "Drame", duration: 194, director: 'James Cameron', prodYear: 1997}*/];

  activeMember: Membre | null;

  constructor(public editDialog: MatDialog, public viewMovieDialog: MatDialog, private communicationService: CommunicationService, private memberService: MemberService) {}

  ngOnInit() {
    this.memberService.obsMember.subscribe((obsMember: Membre | null) => this.activeMember = obsMember);

    // TODO: DATABASE CALL (GET MOVIE LIST)
    this.communicationService.listen().subscribe((m:any) => {
      console.log(m);
      this.getMovies();
  });

  }

  sort(classification: Classification) {
    for(let classif of this.classifications) {
      if(classif === classification) {
        classif.sortType === this.SortType.top ? classif.sortType = this.SortType.bottom : classif.sortType = this.SortType.top;

        // TODO: DATABASE CALL (GET MOVIE LIST GROUPED/RANKED BY CLASSIFICATION)

      } else {
        classif.sortType = this.SortType.none;
      }
    }
  }




  public getMovies(): void {
    this.communicationService.getMovies().subscribe((movies: Movie[]) => {
        console.log(movies);
        this.movies = movies;
        console.log(this.movies)
    });
  }


  show(movie: Movie) {
    this.viewMovieDialog.open(ViewMovieModalComponent, {
      data: {
        id: movie.ID_film,
        title: movie.titre,
        genre: movie.genre,
        duration: movie.duree_totale_min,
        //director: movie.director,
        prodYear: movie.annee_prod
      }
    });
  }

  edit(movie: Movie) {
    this.editDialog.open(EditModalComponent, {
      data: {
        title: movie.titre,
        genre: movie.genre,
        duration: movie.duree_totale_min,
        //director: movie.director,
        prodYear: movie.annee_prod
      }
    });

    // TODO: DATABASE CALL (GET MOVIE LIST GROUPED/RANKED BY CLASSIFICATION)
  }

  delete(movie: Movie) {
    // TODO: DATABASE CALL (DELETE MOVIE)

    let index = this.movies.indexOf(movie);
    this.movies.splice(index);
  }

}
