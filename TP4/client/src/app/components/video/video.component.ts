import { Component, OnInit } from '@angular/core';
import { MatVideoModule } from 'mat-video';
import { Router} from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor(public video: MatVideoModule, public router: Router) { }

  ngOnInit() {
  }

  retour(){
    this.router.navigateByUrl('/member');
  }

}
