import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: ''};
  loading = false; // Loading state for the login button

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void { }

  /*
   * Function responsible for sending the form inputs to the backend
    * and logging the user in. If successful, it closes the modal and navigates to the movies view.
    * If there is an error, it displays an appropriate message using MatSnackBar.
   */
  userLogin(): void {
    this.loading = true; 
    this.fetchApiData.userLogin(this.userData).subscribe(
      (response) => {
        this.dialogRef.close();
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.snackBar.open('User logged in successfully!', 'OK', { duration: 2000 });
        this.router.navigate(['movies']);
        this.loading = false; 
      }, 
      (error) => {
        this.loading = false;
        if (error.status === 0) {
          this.showErrorMessage('Network error: Please check your internet connection.');
        } else if (error.status === 400) {
          this.showErrorMessage('Invalid login credentials. Please try again.');
        } else if (error.status === 404) {
          this.showErrorMessage('User not found. Please check the entered details.');
        } else {
          this.showErrorMessage('An unexpected error occurred. Please try again later.');
        }
        console.error('Login error:', error);
      }
    );
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
}
