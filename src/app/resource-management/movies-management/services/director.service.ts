import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Director } from '../interfaces/Movie.interface';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private baseUrl: string = environments.baseUrl;

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};


  constructor(private http:HttpClient) { }

  //Operaciones CRUD

  getDirectorById (id:number):Observable<Director>{
      return this.http.get<Director>(`${this.baseUrl}/autores/directores/${id}`)
        .pipe(
          catchError ( error => {
            return throwError (() => error);
          })
        )
  }

  updateDirector(director:Director):Observable<Director>{
    const bookJson = JSON.stringify(director);
    return this.http.put<Director>(`${this.baseUrl}/autores/directores`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  addDirector (director:Director):Observable<any>{

    const bookJson = JSON.stringify(director);
    return this.http.post<any>(`${this.baseUrl}/autores/directores`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  deleteDirectorById (id:number):Observable<any> {
    return this.http.delete<boolean>(`${this.baseUrl}/autores/directores/${id}`)
      .pipe(
         catchError ( error => {
          return throwError( () => error);
      })
    );
  }

  getDirectors():Observable<Director[]>{
    return this.http.get<Director[]>(`${this.baseUrl}/autores/directores`);
  }
}
