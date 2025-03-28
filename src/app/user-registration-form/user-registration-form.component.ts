import { Component, OnInit, Input } from '@angular/core';
// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Import brings in the API calls we just created
import { FetchApiDataService } from '../fetch-api-data.service';
// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * This is the function that will run when the component is initialized
   * @param fetchApiData
   * @param dialogRef
   * This is the data model for the user registration form
   * Shows a loading spinner if the form is being submitted
   */
  @Input() userData = { 
    Name: '',
    Username: '',
    Password: '', 
    Email: '',
    Birthday: '',
    FavMovies: []
  }; 

  loading = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * Function sending the form inputs to the backend
   * When the form is submitted, the loading spinner will be shown
   * If the form is successfully submitted, the dialog will be closed
   */
  registerUser(): void {
    this.loading = true; // Set loading to true to show a spinner if needed
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      this.snackBar.open('User registered successfully!', 'OK', {
        duration: 2000
      });
      this.loading = false;
    }, (error) => {
      console.error(error);
      let errorMessage = 'An error occurred. Please try again later.';
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
      this.snackBar.open(errorMessage, 'OK', {
        duration: 2000
      });
      this.loading = false;
    });
  }
}