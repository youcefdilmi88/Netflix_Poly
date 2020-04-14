import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { Membre } from '../../../models/Membre';
import { CommunicationService } from '../../services/communication-service/communication.service';

@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.scss']
})
export class SignUpModalComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";
  emailAddress: string = "";
  password: string;
  adressNumber: string;
  streetName: string = "";
  postalCode: string = "";
  city: string = "";
  isAdmin: boolean;
  monthly: boolean;
  creditCardNum: string;
  expirationMonth: string;
  expirationYear: string;
  ccv: string;
  confirmation: string;

  public currentMembre: Membre;

  constructor(private dialogRef: MatDialogRef<SignUpModalComponent>, public errorDialog: MatDialog, private communicationService: CommunicationService) {}

  ngOnInit() { }

  signUp() {
    if (this.checkIfValid()) {
      this.insertMembre(this.currentMembre)
      this.dialogRef.close();
    } else if (this.password === this.confirmation) {
      this.errorDialog.open(ErrorModalComponent, {
        data: "Veuillez remplir chacun des champs"
      })
    } else {
      this.errorDialog.open(ErrorModalComponent, {
        data: "Le mot de passe n'est pas le même dans les deux champs!"
      })
    }
  }



  public insertMembre(newMembre: Membre): void {
    this.communicationService.insertMembre(newMembre).subscribe((res: number) => {
        console.log(res);
        if (res > 0) {
            this.communicationService.filter("update");
        }
    });
  }


  checkIfValid(): boolean {
    let isValid: boolean = true;

    isValid = isValid && (this.firstName !== "");
    console.log(isValid);
    isValid = isValid && (this.lastName !== "");
    console.log(isValid);
    isValid = isValid && (this.streetName !== "");
    console.log(isValid);
    isValid = isValid && (this.city != "")
    console.log(isValid);
    isValid = isValid && (this.monthly !== null);
    console.log(isValid);

    let regexp1 = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    isValid = isValid && regexp1.test(this.emailAddress);
    console.log(isValid);
    let regexp2 = new RegExp(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/);
    isValid = isValid && regexp2.test(this.postalCode);
    console.log(isValid);

    isValid = isValid && (this.adressNumber !== null) && (Number.isInteger(parseInt(this.adressNumber)));
    console.log(isValid);
    isValid = isValid && (this.creditCardNum !== null) && (Number.isInteger(parseInt(this.creditCardNum))) && (this.creditCardNum.replace(/\s/g, '').length === 16);
    console.log(isValid);
    isValid = isValid && (this.expirationMonth !== null) && (Number.isInteger(parseInt(this.expirationMonth))) && (parseInt(this.expirationMonth) >= 1 && parseInt(this.expirationMonth) <= 12);
    console.log(isValid);
    isValid = isValid && (this.expirationYear !== null) && (Number.isInteger(parseInt(this.expirationYear)));
    console.log(isValid);
    isValid = isValid && (this.ccv !== null) && (Number.isInteger(parseInt(this.ccv))) && (this.ccv.length === 3);
    console.log(isValid);
    isValid = isValid && this.password === this.confirmation;
    console.log(isValid);
    this.currentMembre = new Membre(0, `${this.firstName} ${this.lastName}`, this.password, this.emailAddress, parseInt(this.adressNumber), this.streetName, this.postalCode, this.city, this.isAdmin, this.monthly, parseInt(this.creditCardNum.replace(/\s/g, '')), this.expirationMonth + (this.expirationYear).slice(-2), parseInt(this.ccv));
    return isValid;
  }

}


