import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];
  allMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getAllMovies();
   }

   /**
    * Function to get user data
    * Fetches user data from the API, ensures the user id is set correctly and stores it in local storage
    * Calls getFavoriteMovies to fetch the user's favorite movies
    */
  getUserData(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.userData = {
        ...resp,
        id: resp._id,
        password: undefined,
        token: undefined
      };

      localStorage.setItem('user', JSON.stringify(this.userData));
      console.log(this.userData);
      this.getFavoriteMovies();
    });
  }

  /** Function to get all movies
   * Fetches all movies from the API
   * @returns {Array}
   */
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
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
   getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favoriteMovies = res.filter((movie: any) => {
        return this.userData.favoriteMovies.includes(movie._id);
      });
      console.log(this.favoriteMovies);
    }, (error) => {
      this.snackBar.open('Failed to fetch favorite movies. Please try again later.', 'OK', {
        duration: 3000
      });
    });
  }

  /**
   * Function to check if a movie is in user's favorites
   * @param movieId
   * @returns {boolean}
   */
  isFavorite(movie: any): boolean {
    return this.userData.favortieMovies.includes(movie._id);
  }

  /**
   * Function to add a movie to user's favorite movies
   * Calls the API to add the movie to the user's favorites
   * Updates the userData and favoriteMovies arrays accordingly
   * Displays a success message using MatSnackBar
   * @param movie 
   * @returns
   */
    addToFavorite(movie: any): void {
      this.fetchApiData.addFavoriteMovie(this.userData.id, movie._id).subscribe((res: any) => {
        this.userData.favoriteMovies = res.favoriteMovies;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.getFavoriteMovies();
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
  removeFromFavorite(movie: any): void {
    this.fetchApiData.deleteFavoriteMovie(this.userData.id, movie._id).subscribe((res: any) => {
      this.userData.favoriteMovies = res.favoriteMovies;
      localStorage.setItem('user', JSON.stringify(this.userData));
      this.getFavoriteMovies();
      this.snackBar.open(`${movie.title} removed from favorites!`, 'OK', {
        duration: 3000
      });
    }, (error) => {
      this.snackBar.open('Failed to remove movie from favorites. Please try again later.', 'OK', {
        duration: 3000
      });
    });
  }

  /**
    * Function to update user data
    * Sends updated user details to the API and updates local storage
    * Calls getFavoriteMovies to refresh the user's favorite movies
    */
  updateUserData(): void {
    const updatedUserDetails = {
      ...this.userData,
      password: this.userData.password || undefined
    };

    this.fetchApiData.editUser(updatedUserDetails).subscribe((res: any) => {
      this.userData = {
        ...res,
        id: res._id,
        password: undefined,
        token: undefined
      };

      localStorage.setItem('user', JSON.stringify(this.userData));
      this.getFavoriteMovies();
      
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 3000
      });
    }, (error) => {
      this.snackBar.open('Failed to update profile. Please try again later.', 'OK', {
        duration: 3000
      });
    })
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
    this.favoriteMovies = [];
  }
}
