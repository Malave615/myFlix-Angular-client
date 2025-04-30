import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  email: string = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Sends a password reset request to the API with the provided email.
   */
  onSubmit(): void {
    if (this.email) {
      this.fetchApiData.resetPassword(this.email).subscribe(
        (response) => {
          this.snackBar.open('Password reset link sent to your email!', 'OK', {
            duration: 3000
          });
          console.log('Password reset request sent successfully:', response);
          this.dialogRef.close();
        },
        (error) => {
          this.snackBar.open('Error sending password reset link. Please try again.', 'OK', {
            duration: 3000
          });
          console.error('Error sending password reset request:', error);
        }
      );
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
