import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddMovieModalComponent } from '../modals/add-movie-modal/add-movie-modal.component';
import { MoviesGridComponent } from '../movies-grid/movies-grid.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public addMovieDialog: MatDialog, public movieGrid: MoviesGridComponent) { }

  ngOnInit() {
  }

  addMovie() {
    this.addMovieDialog.open(AddMovieModalComponent, {});
  }

}
