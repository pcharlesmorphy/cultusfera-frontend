import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Actor } from '../interfaces/Movie.interface';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  private baseUrl: string = environments.baseUrl;

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};


  constructor(private http:HttpClient) { }

  //Operaciones CRUD

  getActorById (id:number):Observable<Actor>{
      return this.http.get<Actor>(`${this.baseUrl}/autores/actores/${id}`)
        .pipe(
          catchError ( error => {
            return throwError (() => error);
          })
        )
  }

  updateActor(actor:Actor):Observable<Actor>{
    const bookJson = JSON.stringify(actor);
    return this.http.put<Actor>(`${this.baseUrl}/autores/actores`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  addActor (actor:Actor):Observable<any>{

    const bookJson = JSON.stringify(actor);
    return this.http.post<any>(`${this.baseUrl}/autores/actores`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  deleteActorById (id:number):Observable<any> {
    return this.http.delete<boolean>(`${this.baseUrl}/autores/actores/${id}`)
      .pipe(
         catchError ( error => {
          return throwError( () => error);
      })
    );
  }

  getActors():Observable<Actor[]>{
    return this.http.get<Actor[]>(`${this.baseUrl}/autores/actores`);
  }
}
