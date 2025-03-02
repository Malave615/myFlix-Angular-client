import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://tracys-movie-api-083e9c37dd14.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient tot the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  private getStoredToken(): any {
    return localStorage.getItem('token');
  }

  private getStoredUser(): any {
    return JSON.parse(localStorage.getItem('user') || '');
  }

  // User registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', JSON.stringify(userDetails)).pipe(
      catchError(this.handleError)
    );
  }

  // User login (store token and username)
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map(this.extractResponseData),        
      catchError(this.handleError),
    );
  }

  // Get authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Error: no token found in localStorage');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get one movie
  public getMovie(title: string): Observable<any> {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + `movies/${title}`, {headers: new HttpHeaders(
      {
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get director
  public getDirector(name: string) {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + `movies/director/${name}`, {headers: new HttpHeaders(
      {
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get genre
  public getGenre(name: string) {
    const token = this.getStoredToken();
    return this.http.get(apiUrl + `movies/genre/${name}`, {headers: new HttpHeaders(
      {
        Authorization: `Bearer ${token}`,
      }) 
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   // Get user
   public getUser(username: string): Observable<any> {
    return this.http.get(apiUrl +`users/${username}`, { headers: this.getAuthHeaders() }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  public getUsername(): string | null {
    const userData = localStorage.getItem('user');
    try {
      const parsedUser = JSON.parse(userData || '{}');
      return parsedUser.username || null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  }

  // Get favorite movies for a user
  public getFavoriteMovies(): Observable<any> {
    const token = this.getStoredToken();
    let user = this.getStoredUser();

    return this.http.get(apiUrl + `users/${user.username}/movies`, {headers: new HttpHeaders(
      {
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Add a movie to favorites
  public addMovieToFavorites(movieId: string) {
    const token = this.getStoredToken();
    let user = this.getStoredUser();

    return this.http.put(apiUrl + `users/${user.username}/movies/${movieId}`, movieId, {headers: new HttpHeaders(
      {
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );  
  }

  // Delete a movie from favorites
  public deleteMovieFromFavorites(movieId: string) {
    const token = this.getStoredToken();
    let user = this.getStoredUser();

    return this.http.delete(apiUrl + `users/${user.username}/movies/${movieId}`, {headers: new HttpHeaders(
      {
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Edit user
  public editUser(userData: any): Observable<any> {
    const token = this.getStoredToken();
    let user = this.getStoredUser();

    return this.http.put(apiUrl + `users/${user.username}`, userData, {headers: new HttpHeaders(
      {
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete user
  public deleteUser(userData: any): Observable<any> {
    const token = this.getStoredToken();
    let user = this.getStoredUser();

    return this.http.delete(apiUrl + `users/${user.username}`, {headers: new HttpHeaders(
      {
        Authorization: `Bearer ${token}`,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; Please try again later.');
    }

    private extractResponseData(res: any): any {
      const body = res;
      return body || { };
    }
}


