import { Component } from '@angular/core';
import { Constants } from 'src/app/shared/Constants';
import { DialogDonateComponent } from 'src/app/shared/dialogs/donate/dialog.donate.component';
import { DialogSignUpComponent } from 'src/app/shared/dialogs/signup/dialog.signup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'public-website-index',
  templateUrl: './index.component.html'
})
export class PublicWebsiteIndexComponent {
  constants = Constants;

  constructor(public dialog: MatDialog) { }

  donate() {
    const dialogDonate = this.dialog.open(DialogDonateComponent);
    dialogDonate.afterClosed().subscribe(result => {
      if (result) {
        dialogDonate.close();
      }
    });
  }

  signUp() {
    const dialogSignUp = this.dialog.open(DialogSignUpComponent);
    dialogSignUp.afterClosed().subscribe(result => {
      if (result) {
        dialogSignUp.close();
      }
    });
  }
}