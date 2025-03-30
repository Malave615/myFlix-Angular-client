import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userData: any = {};
  FavMovies: any[] = [];
  allMovies: any[] = [];
  isEditingProfile: boolean = false;

  constructor(
    private fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (user) {
      this.getUserData();
      this.getAllMovies();
    } else {
      this.snackBar.open('Please log in to view your profile.', 'OK', {
        duration: 3000
      });
      this.router.navigate(['welcome']);
    }
  }

  /**
   * Function to get user data
   * Fetches user data from the API, ensures the user id is set correctly and stores it in local storage
   * Calls getFavoriteMovies to fetch the user's favorite movies
   */
  getUserData(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      console.log('User Data:', resp);
      this.userData = {
        ...resp,
        id: resp._id,
        password: undefined,
        token: undefined,
        FavMovies: resp.FavMovies || []
      };

      localStorage.setItem('user', JSON.stringify(this.userData));
      this.getFavMovies();
    });
  }

  /**
   * Reusable method for API calls
   */
  getMovies(): Observable<any[]> {
    return this.fetchApiData.getAllMovies();
  }
  
  /** Function to get all movies
   * Fetches all movies from the API
   * @returns {Array}
   */
  getAllMovies(): void {
    this.getMovies().subscribe((res: any) => {
      this.allMovies = res;
      console.log(this.allMovies);
    }, (error) => {
      this.snackBar.open('Failed to fetch movies. Please try again later.', 'OK', {
        duration: 3000
      });
    });
  }
  
  /**
   * Function to fetch user's favorite movies
   * Filters the movies based on the user's favorite movie IDs
   * Updates the favoriteMovies array with the filtered movies
   */
  getFavMovies(): void {
    this.getMovies().subscribe((res: any) => {
      this.FavMovies = res.filter((movie: any) => this.userData.FavMovies.includes(movie._id));
      console.log('Updated FavMovies:', this.FavMovies);
    }, (error) => {
      this.snackBar.open('Failed to fetch favorite movies. Please try again later.', 'OK', {
        duration: 3000
      });
    });
  }

  /** 
   * Function to open the edit profile dialog
   * Opens a dialog to edit user profile
   * Passes the user data to the dialog
   * On dialog close, updates the user data
   */
  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileFormComponent, {
      width: '500px',
      data: this.userData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUserData();
      }
    });
  }

  /**
   * Function to check if a movie is in user's favorites
   * @param movieId
   * @returns {boolean}
   */
  isFav(movie: any): boolean {
    return this.userData.FavMovies.includes(movie._id);
  }

  /**
   * Function to add a movie to user's favorite movies
   * Calls the API to add the movie to the user's favorites
   * Updates the userData and favoriteMovies arrays accordingly
   * Displays a success message using MatSnackBar
   * @param movie 
   * @returns
   */
  addToFav(movie: any): void {
    this.fetchApiData.addFavMovie(this.userData.id, movie._id).subscribe((res: any) => {
      console.log('Updated FavMovies:', res.FavMovies);

      this.userData.FavMovies = res.FavMovies;
      localStorage.setItem('user', JSON.stringify(this.userData));
      this.getFavMovies();
      this.snackBar.open(`${movie.title} added to favorites!`, 'OK', {
        duration: 3000
      });
    }, (error) => {
      this.snackBar.open('Failed to add movie to favorites. Please try again later.', 'OK', {
        duration: 3000
      });
    })
  }

  /**
   * Function to remove a movie from user's favorite movies
   * Calls the API to delete the movie from the user's favorites
   * Updates the userData and favoriteMovies arrays accordingly
   * Displays a success message using MatSnackBar
   */
  removeFromFav(movie: any): void {
    const Username = this.userData.Username;
    const movieId = movie._id;

    if (!Username) {
      console.error('Username is undefined! User not logged in.')
      this.snackBar.open('User not logged in. Please log in.', 'OK', {
        duration: 3000
      });
      return;
    }

    console.log(`Removing movie with ID: ${movieId} for user: ${Username}`);
  

    this.fetchApiData.deleteFavMovie(Username, movieId).subscribe((res: any) => {
      this.userData.FavMovies = res.FavMovies;
      localStorage.setItem('user', JSON.stringify(this.userData));
      this.getFavMovies();
      this.snackBar.open(`${movie.title} removed from favorites!`, 'OK', {
        duration: 3000
      });
    }, (error) => {
      console.error('Error removing from favorites:', error);
      this.snackBar.open('Failed to remove movie from favorites. Please try again later.', 'OK', {
        duration: 3000
      });
    });
  }

  /**
   * Function to navigate back to Movies page
   */
  goToMoviesPage(): void {
    this.router.navigate(['/movies']);
  }

  /**
   * Function to delete user account
   * Navigates to the welcome page and clears local storage
   */
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
    this.snackBar.open('Logged out successfully!', 'OK', {
      duration: 3000
    });
    this.userData = {};
    this.FavMovies = [];
  }
};


















  









  

  
















  
