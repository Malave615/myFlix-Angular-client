import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})
export class EditProfileFormComponent {
  userData: any;

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditProfileFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.userData = { ...data };
  }

  /**
   * Function to save the updated user data
   * Validates the input fields and sends the updated data to the API
   * If successful, closes the dialog and navigates to the profile page
   * If there's an error, logs it to the console
   */
  onSave(): void {
    this.fetchApiData.updateUser(this.userData.Username, this.userData).subscribe(
      (res: any) => {
        this.snackBar.open('Profile updated successfully!', 'OK', { duration: 3000 });
        this.dialogRef.close(this.userData);
      },
      (error) => {
        this.snackBar.open('Failed to update profile. Please try again later.', 'OK', {
          duration: 3000
        });
      }
    );
  }

  loadUserData() {
    this.userData = { ...this.data };
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
