import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { BookPublisher } from '../interfaces/Book.interface';
import { environments } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookPublisherService {

  private baseUrl: string = environments.baseUrl;

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};


  constructor(private http:HttpClient) { }

  //Operaciones CRUD

  getBookPublisherById (id:number):Observable<BookPublisher>{
      return this.http.get<BookPublisher>(`${this.baseUrl}/libros/editoriales/${id}`)
        .pipe(
          catchError ( error => {
            return throwError (() => error);
          })
        )
  }

  updateBookPublisher(publisher:BookPublisher):Observable<BookPublisher>{
    const bookJson = JSON.stringify(publisher);
    return this.http.put<BookPublisher>(`${this.baseUrl}/libros/editoriales`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  addBookPublisher (publisher:BookPublisher):Observable<any>{

    const bookJson = JSON.stringify(publisher);
    return this.http.post<any>(`${this.baseUrl}/libros/editoriales`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  deleteBookPublisherById (id:number):Observable<any> {
    return this.http.delete<boolean>(`${this.baseUrl}/libros/editoriales/${id}`)
      .pipe(
         catchError ( error => {
          return throwError( () => error);
      })
    );
  }

  getBookPublishers():Observable<BookPublisher[]>{
    return this.http.get<BookPublisher[]>(`${this.baseUrl}/libros/editoriales`);
  }
}
