import { Component, OnInit } from '@angular/core';
//import { Member } from 'src/app/member';
import { Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';
import { MemberService } from "../services/member-service/memberService";
//import { SignUpModalComponent } from '../modals/sign-up-modal/sign-up-modal.component';
import { CommunicationService } from '../services/communication-service/communication.service'
import { Membre } from "../../models/Membre";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public activeMember: Membre | null = null;
  public password: string = "";
  public loginEmailAddress: string = "";



  constructor(public router: Router, public errorDialog: MatDialog/*, public signUpDialog: MatDialog*/, public communicationService: CommunicationService, private memberService: MemberService) {}

  ngOnInit() {}

  // signUp() {
  //   this.signUpDialog.open(SignUpModalComponent);
  // }

  logIn() {
    //TODO: DATABASE CALL (CHECK IF EMAIL ADDRESS AND PASSWORD MATCH)

      if(this.communicationService.getDBcreated()) {
        let isValid: boolean = false;
        this.communicationService.login(this.loginEmailAddress, this.password).subscribe((membres: Membre[]) => {
            isValid = membres.length > 0 ? true : false;
            if (isValid) {
              this.activeMember = new Membre(membres[0].ID_membre, membres[0].nom, membres[0].mot_de_passe, membres[0].courriel, membres[0].no_rue, membres[0].rue, membres[0].code_postal, membres[0].ville, membres[0].isAdmin, membres[0].monthly, membres[0].cardNum, membres[0].expDate, membres[0].CCV)
              this.memberService.setActiveMember(this.activeMember);
              if(membres[0].isAdmin){
                this.router.navigateByUrl('/admin');
              } else {
                this.router.navigateByUrl('/member');
              }
            } else {
              this.errorDialog.open(ErrorModalComponent, {
                data: "Adresse courriel ou mot de passe invalide"
              });
            }
        });
      } else {
          this.errorDialog.open(ErrorModalComponent, {
            data: "Veuillez initialiser la base de données"
          });
        }
  }



  public createDB(): void {
    this.communicationService.setUpDatabase().subscribe((res: any) => {
        console.log(res);
    });
    this.communicationService.setDBcreated(true);
  }

  // logInMember() {
  //   //TODO: DATABASE CALL (CHECK IF EMAIL ADDRESS AND PASSWORD MATCH)
  //   if (true) { //TODO: MODIFY WITH CHECK ABOVE
  //     this.activeMember = new Membre(1234, "Youcef", "1234", "youcef@polymtl.ca" ,1234, "Foo", "H1J3B9", "Montreal", false);
  //     this.memberService.setActiveMember(this.activeMember);
  //     this.router.navigateByUrl('/member');
  //   } else {
  //     this.errorDialog.open(ErrorModalComponent, {
  //       data: "Adresse courriel ou mot de passe invalide"
  //     });
  //   }
  // }


}

