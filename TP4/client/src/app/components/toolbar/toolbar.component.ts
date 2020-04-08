import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddMovieModalComponent } from '../modals/add-movie-modal/add-movie-modal.component';
import { AddParticipantModalComponent } from '../modals/add-participant-modal/add-participant-modal.component';
import { Membre } from "../../Membre";
import { MemberService } from "../services/member-service/memberService";
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public activeMember: Membre | null = null;
  public dialogRef: any;

  constructor(public addMovieDialog: MatDialog, public addParticipantDialog: MatDialog, public memberService: MemberService, public router: Router) { }

  ngOnInit() {
    this.memberService.obsMember.subscribe((obsMember: Membre | null) => this.activeMember = obsMember);
  }

  logOut() {
    this.router.navigateByUrl('/');
  }

  addMovie() {
    this.addMovieDialog.open(AddMovieModalComponent, {});
  }

  addParticipant() {
    this.addParticipantDialog.open(AddParticipantModalComponent, {});
  }

}
