import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Musician } from '../interfaces/Album.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicianService {

  private baseUrl: string = environments.baseUrl;

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};


  constructor(private http:HttpClient) { }

  //Operaciones CRUD

  getMusicianById (id:number):Observable<Musician>{
      return this.http.get<Musician>(`${this.baseUrl}/autores/musicos/${id}`)
        .pipe(
          catchError ( error => {
            return throwError (() => error);
          })
        )
  }

  updateMusician(musician:Musician):Observable<Musician>{
    const bookJson = JSON.stringify(musician);
    return this.http.put<Musician>(`${this.baseUrl}/autores/musicos`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  addMusician (musician:Musician):Observable<any>{

    const bookJson = JSON.stringify(musician);
    return this.http.post<any>(`${this.baseUrl}/autores/musicos`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  deleteMusicianById (id:number):Observable<any> {
    return this.http.delete<boolean>(`${this.baseUrl}/autores/musicos/${id}`)
      .pipe(
         catchError ( error => {
          return throwError( () => error);
      })
    );
  }

  getMusicians():Observable<Musician[]>{
    return this.http.get<Musician[]>(`${this.baseUrl}/autores/musicos`);
  }

}
