import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatMenuModule} from '@angular/material/menu';
import { MoviesGridComponent } from './components/movies-grid/movies-grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { EditModalComponent } from './components/modals/edit-modal/edit-modal.component';
import { FormsModule } from '@angular/forms';
import { ErrorModalComponent } from './components/modals/error-modal/error-modal.component';
import { ViewMovieModalComponent } from './components/modals/view-movie-modal/view-movie-modal.component';
import { AddMovieModalComponent } from './components/modals/add-movie-modal/add-movie-modal.component';
import { AddParticipantModalComponent } from './components/modals/add-participant-modal/add-participant-modal.component';
import { CommunicationService } from "./services/communication.service";



@NgModule({
    declarations: [AppComponent, ToolbarComponent, MoviesGridComponent, EditModalComponent, ErrorModalComponent, ViewMovieModalComponent, AddMovieModalComponent, AddParticipantModalComponent],
    imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, MatToolbarModule, MatMenuModule,
              MatGridListModule, MatIconModule, MatDialogModule, FormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatOptionModule, MatSelectModule],
    providers: [MatDialogModule, CommunicationService, MoviesGridComponent],
    bootstrap: [AppComponent],
    entryComponents: [EditModalComponent, ErrorModalComponent, ViewMovieModalComponent, AddMovieModalComponent],
})
export class AppModule {}
