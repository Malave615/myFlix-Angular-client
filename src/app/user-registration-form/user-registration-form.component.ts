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

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // Function sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(response);
      this.snackBar.open('User registered successfully!', 'OK', {
        duration: 2000
      });
    }, 
    error: (errorResponse) => {
      console.error(errorResponse);
      const errorMessage = errorResponse.error?.message || 'An error occurred during registration.';
      this.snackBar.open(errorResponse, 'OK', {
        duration: 2000
      });
    }
  });
}
}
