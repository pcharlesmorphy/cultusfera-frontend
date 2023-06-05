import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Review } from '../interfaces/Review.interface';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl: string = environments.baseUrl;
  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};


  constructor(private http:HttpClient) { }

  //Operaciones CRUD

  getReviewsByResource (id:number):Observable<Review[]>{
      return this.http.get<Review[]>(`${this.baseUrl}/recursos/reviews/${id}`);
  }

  getReviewsByUser (id:number):Observable<Review[]>{
    return this.http.get<Review[]>(`${this.baseUrl}/usuarios/reviews/${id}`);
  }

  updateReview(review:Review):Observable<Review>{
    const bookJson = JSON.stringify(review);
    console.log(bookJson);
    return this.http.put<Review>(`${this.baseUrl}/recursos/reviews`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }


  addReview (review:Review):Observable<any>{

    const bookJson = JSON.stringify(review);
    console.log(bookJson);
    return this.http.post<any>(`${this.baseUrl}/recursos/reviews`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }


  deleteReviewById (id:number):Observable<any> {
    return this.http.delete<boolean>(`${this.baseUrl}/recursos/reviews/${id}`)
      .pipe(
         catchError ( error => {
          return throwError( () => error);
      })
    );
  }


  getReviewById (id:number):Observable<Review>{
    return this.http.get<Review>(`${this.baseUrl}/recursos/reviews/review/${id}`)
      .pipe(
        catchError ( error => {
          return throwError (() => error);
        })
      )
}

}
