import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

/** Declaring the api url that will provide data for the client app
 * This is the default path of the API
 */
const apiUrl = 'https://tracys-movie-api-083e9c37dd14.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /*
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   * This allows us to make HTTP requests to the API
   */
  constructor(private http: HttpClient, private router: Router) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing.');
    }
    return new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
  }

  /*
   * API call for user registration
   * @param userDetails - an object containing the user's registration details
   * @returns an Observable of the HTTP response from the API
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users/', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /*
   * API call for user login
   * @param userDetails - an object containing the user's login details
   * @returns an Observable of the HTTP response from the API
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login/', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /*
   * API call to get all movies
   * @returns an Observable of the HTTP response from the API
   */
  public getAllMovies(): Observable<any> {
    return this.http.get<any[]>(apiUrl + 'movies/', { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   /*
    * API call to get a specific movie by title
    * @param movietitle - the title of the movie to retrieve
    * @returns an Observable of the HTTP response from the API
    */
  public getMovie(movieTitle: String): Observable<any> {
    return this.http.get(apiUrl + 'movies/' + movieTitle, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   /*
    * API call to get a director by name
    * @param movieDirector - the name of the director to retrieve
    * @returns an Observable of the HTTP response from the API
    */
   public getDirector(movieDirector: String): Observable<any> {
    return this.http.get(apiUrl + 'movies/director/' + movieDirector, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /*
   * API call to get a genre by name
   * @param movieGenre - the name of the genre to retrieve
   * @returns an Observable of the HTTP response from the API
   */
  public getGenre(movieGenre: String): Observable<any> {
    return this.http.get(apiUrl + 'movies/genre/' + movieGenre, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /*
   * API call to get a list of users
   * @returns an Observable of the HTTP response from the API
   */
  public getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || "{}");
    
    return this.http.get(apiUrl + 'users/' + user.Username, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  };

   /*
    * API call to get a specific user by username
    * @param username - the username of the user to retrieve
    * @returns an Observable of the HTTP response from the API
    */
  public getUserFavMovies(): any {
    const user = JSON.parse(localStorage.getItem('user') || "{}");
    return {
      user: user.FavMovies
    };
  }

  /*
   * API call to add a movie to a user's favorite movies
   * @param username - the username of the user to add the movie to
   * @param movieTitle - the title of the movie to add to the user's favorites
   * @returns an Observable of the HTTP response from the API
   */
  public addFavMovie(username: String, movieId: String): Observable<any> {
    return this.http.post(apiUrl + 'users/' + username + '/' + 'movies/' + movieId, {}, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /* 
   * API call to edit user details
   * @param username - the username of the user to edit
   * @param userDetails - an object containing the user's updated details
   * @returns an Observable of the HTTP response from the API
   */
  public updateUser(Username: string, updatedUserDetails: any): Observable<any> {
    return this.http.put<any>(apiUrl + 'users/' + Username, updatedUserDetails, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /*
   * API call to delete a user by username
   * @param username - the username of the user to delete
   * @returns an Observable of the HTTP response from the API
   */
  public deleteUser(username: String): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + username ,  { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  
  /*
   * API call to delete a movie from a user's favorite movies
   * @param username - the username of the user to remove the movie from
   * @param movieTitle - the title of the movie to remove from the user's favorites
   * @returns an Observable of the HTTP response from the API
   */
  public deleteFavMovie(username: String, movieTitle: String): Observable<any> {
    return this.http.delete(apiUrl + 'users/' + username + '/' + 'movies/' + movieTitle, { headers: this.getAuthHeaders() }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /* 
   * Handle errors from HTTP requests
   * @param error - the error response from the HTTP request
   * @returns an Observable that throws an error message
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      this.router.navigate(['login']);
    }
    console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error}`);
    return throwError(
    'Something went wrong; please try again later.');
  }
  
  private extractResponseData(res: any): any {
    return res || { };
  }
}