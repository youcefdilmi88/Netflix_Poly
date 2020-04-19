import { Component, OnInit } from '@angular/core';
import { Classification } from '../../models/classification';
import { SortType } from 'src/app/models/enums';
import { Movie } from '../../../../../server/app/tables/Movie';
import { MatDialog } from '@angular/material';
import { EditModalComponent } from '../modals/edit-modal/edit-modal.component';
import { ViewMovieModalComponent } from '../modals/view-movie-modal/view-movie-modal.component';
import { CommunicationService } from '../../services/communication-service/communication.service';
import { MemberService } from "../../services/member-service/memberService";
import { Membre } from "../../models/Membre";
import { Participant } from '../../models/participant'
import { Nomination } from '../../models/nomination'


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
  distribution : Participant[] = [/*{id: 1, title: 'Titanic', genre: "Drame", duration: 194, director: 'James Cameron', prodYear: 1997}*/];
  nominations : Nomination[] = [/*{id: 1, title: 'Titanic', genre: "Drame", duration: 194, director: 'James Cameron', prodYear: 1997}*/];

  activeMember: Membre | null;

  constructor(public editDialog: MatDialog, public viewMovieDialog: MatDialog, private communicationService: CommunicationService, private memberService: MemberService) {}

  ngOnInit() {
      this.memberService.obsMember.subscribe((obsMember: Membre | null) => this.activeMember = obsMember);
      this.communicationService.listen().subscribe((m:any) => {
        this.getMovies();
    });
  }


  public getMovies(): void {
    this.communicationService.getMovies().subscribe((movies: Movie[]) => {
        this.movies = movies;
        console.log(this.movies)
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


  show(movie: Movie) {
      // TODO: get distribution et nomination du film
    this.communicationService.getNominations(movie.ID_film).subscribe((nominations: Nomination[]) => {
        console.log(`fetch nominations pour ${movie.titre}`)
        console.log(nominations)
        this.communicationService.getDistribution(movie.ID_film).subscribe((distribution: Participant[]) => {
          console.log(`fetch distributions pour ${movie.titre}`)
          console.log(distribution)
          this.viewMovieDialog.open(ViewMovieModalComponent, {
            data: {
              movie: movie,
              distribution: distribution, // Et remplacer ici
              nominations: nominations,  // Et ici
            }
          });
        });
    });


  }

  edit(movie: Movie) {
    this.editDialog.open(EditModalComponent, {
      data: {
        ID_film: movie.ID_film,
        title: movie.titre,
        genre: movie.genre,
        duration: movie.duree_totale_min,
        prodYear: movie.annee_prod
      }
    });

    // TODO: DATABASE CALL (GET MOVIE LIST GROUPED/RANKED BY CLASSIFICATION)
  }

  delete(movie: Movie) {
    this.communicationService.deleteMovie(movie.ID_film).subscribe((res: number) => {
      console.log(res);
      if (res > 0) {
          this.communicationService.filter("update");
      }
    });
  }







}


