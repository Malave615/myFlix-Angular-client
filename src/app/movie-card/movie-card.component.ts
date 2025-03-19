import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = []; // Initialize movies as an empty array
  constructor(private fetchApiData: FetchApiDataService) { }

ngOnInit(): void {
    this.getMovies();
}

getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp; // Assign the response to the movies property
      console.log(this.movies); // Log the movies to the console for debugging
      return this.movies; // Return the movies array
    });
  }

}
