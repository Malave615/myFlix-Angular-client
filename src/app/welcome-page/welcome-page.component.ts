import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  loading = false;
  
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  /**
   * Opens the user registration dialog with a loading indicator.
   * The dialog is opened after a delay to simulate loading.
   */
  openUserRegistrationDialog(): void {
    this.loading = true;
    setTimeout(() => {
      try {
        this.dialog.open(UserRegistrationFormComponent, {
          width: '280px'
        });
        this.loading = false;
      }catch (error) {
        this.loading = false;
        this.showErrorMessage('Failed to open registration dialog. Please try again later.');
      }
    }, 1000);
  }

  /*
    * Opens the user login dialog with a loading indicator.
    * The dialog is opened after a delay to simulate loading.
    */
  openUserLoginDialog(): void {
    this.loading = true;
    setTimeout(() => { 
      try {
        this.dialog.open(UserLoginFormComponent, {
          width: '280px'
        });
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.showErrorMessage('Failed to open login dialog. Please try again later.');
      }
    }, 1000);
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
}
