import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionDialogComponent } from '../description-dialog/description-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  loading: boolean = false;
  retryAttempt: boolean = false;

  constructor(
    private fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  /*
   * Fetches all movies from the API and assigns them to the movies property.
   * Displays a loading indicator while fetching data and handles errors appropriately.
   */
  getMovies(): void {
    this.loading = true;
    this.retryAttempt = false;

    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.handleError(error);
      }
    );
  }

  /*
   * Opens a dialog to display the description of a movie.
   * @param name - The name of the movie to display.
   */
  openDescriptionDialog(movie: any): void {
    if (
      movie &&
      movie.Title &&
      movie.Description &&
      movie.Genre &&
      movie.Director
    ) {
      this.dialog.open(DescriptionDialogComponent, {
        data: {
          movie: {
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre.Name,
            GenreDescription: movie.Genre.Description,
            Director: movie.Director.Name,
            DirectorBio: movie.Director.Bio,
            DirectorBirth: movie.Director.Birth,
            Actors: movie.Actors,
            ReleaseYear: movie.ReleaseYear,
            Image: movie.ImagePath
          }
        }
      });
    } else {
      console.error('Movie data is incomplete or missing properties:', movie);
      this.snackBar.open('Movie data is incomplete. Please try again.', 'OK', {
        duration: 3000
      });
    }
  }

  /*
   * Opens a dialog to display the genre of a movie.
   * @param name - The name of the movie to display.
   */
  openGenreDialog(movie: any): void {
    console.log('Opening Genre Dialog for:', movie);

    if (movie && movie.Genre) {
      const genreData = {
        Genre: {
          Name: movie.Genre.Name,
          Description: movie.Genre.Description
        }
      };

      const dialogRef = this.dialog.open(GenreDialogComponent, {
        width: '600px',
        data: genreData
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    } else {
      console.error('Movie genre is undefined:', movie);
    }
  }

  /*
   * Opens a dialog to display the director of a movie.
   * @param name - The name of the movie to display.
   */
  openDirectorDialog(director: any): void {
    console.log('Opening Director Dialog for:', director);

    if (director && director.Name) {
      const directorData = {
        Director: {
          Name: director.Name,
          Bio: director.Bio,
          Birth: director.Birth
        }
      };

      const dialogRef = this.dialog.open(DirectorDialogComponent, {
        width: '600px',
        data: directorData
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    } else {
      console.error('Director data is undefined:', director);
    }
  }

  /*
   * Add a movie to the user's favorites list.
   * @param id - The ID of the movie to add to favorites.
   * */
  addToFavorites(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.Username) {
      this.fetchApiData.addFavoriteMovie(user.Username, movie._id).subscribe(
        (response) => {
          console.log(response);
          this.snackBar.open(
            `${movie.Title} has been added to your favorites!`,
            'OK',
            { duration: 3000 }
          );

          user.FavMovies.push(movie._id);
          localStorage.setItem('user', JSON.stringify(user));
        },
        (error) => {
          console.error('Error adding movie to favorites:', error);
          this.snackBar.open(
            'Failed to add to favorites. Please try again.',
            'OK',
            { duration: 3000 }
          );
        }
      );
    } else {
      this.snackBar.open(
        'Please log in to add movies to your favorites.',
        'OK',
        { duration: 3000 }
      );
    }
  }

  /*
   * Handles errors that occur during the API call.
   * Displays appropriate error messages based on the status code.
   */
  private handleError(error: any): void {
    if (error.status === 0) {
      this.showErrorMessage(
        'Network error: Please check your internet connection and try again.'
      );
    } else if (error.status === 400) {
      this.showErrorMessage(
        'Invalid input. Please check the data you provided.'
      );
    } else if (error.status === 404) {
      this.showErrorMessage('Movies not found. Please try again later.');
    } else if (error.status === 500) {
      this.showErrorMessage('Server error. Please try again later.');
    } else if (error.status === 401) {
      this.showErrorMessage('Unauthorized access. Please log in to continue.');
    } else if (error.status === 403) {
      this.showErrorMessage(
        'Forbidden access. You do not have permission to view this resource.'
      );
    } else {
      this.showErrorMessage(
        'An unexpected error occurred. Please try again later.'
      );
    }

    console.error('Error fetching movies:', error);
  }

  private showErrorMessage(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }

  retryFetchMovies(): void {
    this.retryAttempt = true;
    this.getMovies();
  }
}
