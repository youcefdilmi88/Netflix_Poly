import { Component, OnInit } from '@angular/core';
import { MatVideoModule } from 'mat-video';
import { Router} from '@angular/router';
import { MemberService } from "../../services/member-service/memberService";
import { Membre } from "../../models/Membre";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor(public video: MatVideoModule, public router: Router, private memberService: MemberService) { }

  activeMember: Membre | null;

  ngOnInit() {
    this.memberService.obsMember.subscribe((obsMember: Membre | null) => this.activeMember = obsMember);

  }

  retour(){
    if(this.activeMember  === null){}
    else if (this.activeMember.isAdmin) {
      this.router.navigateByUrl('/admin');
    } else {
        this.router.navigateByUrl('member');
      }
  }

}
