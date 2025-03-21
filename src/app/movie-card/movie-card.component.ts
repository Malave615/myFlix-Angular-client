import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit{
  movies: any[] = []; // Initialize movies as an empty array
  loading: boolean = false;
  retryAttempt: boolean = false;

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.loading = true; // Set loading to true while fetching data
    this.retryAttempt = false;

    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp; // Assign the response to the movies property
        console.log(this.movies);
        this.loading = false; 
      }, 
      (error) => {
        this.loading = false;
        this.handleError(error);
      }
    );
  }

  private handleError(error: any): void {
    if (error.status ===0) {
      this.showErrorMessage('Network error: Please check your internet connection and try again.');
    } else if (error.status === 400) {
      this.showErrorMessage('Invalid input. Please check the data you provided.');
    } else if (error.status === 404) {
      this.showErrorMessage('Movies not found. Please try again later.');
    } else if (error.status === 500) {
      this.showErrorMessage('Server error. Please try again later.');
    } else if (error.status === 401) {
      this.showErrorMessage('Unauthorized access. Please log in to continue.');
    } else if (error.status === 403) {
      this.showErrorMessage('Forbidden access. You do not have permission to view this resource.');
    } else {
      this.showErrorMessage('An unexpected error occurred. Please try again later.');
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
