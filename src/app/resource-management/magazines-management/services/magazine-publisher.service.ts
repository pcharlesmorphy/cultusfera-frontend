import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { MagazinePublisher } from '../interfaces/Magazine.interface';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MagazinePublisherService {

  private baseUrl: string = environments.baseUrl;

  public httpOptions = {
    headers: new HttpHeaders ({'Content-Type':'application/json'})};


  constructor(private http:HttpClient) { }

  //Operaciones CRUD

  getMagazinePublisherById (id:number):Observable<MagazinePublisher>{
      return this.http.get<MagazinePublisher>(`${this.baseUrl}/revistas/editoriales/${id}`)
        .pipe(
          catchError ( error => {
            return throwError (() => error);
          })
        )
  }

  updateMagazinePublisher(publisher:MagazinePublisher):Observable<MagazinePublisher>{
    const magazineJson = JSON.stringify(publisher);
    return this.http.put<MagazinePublisher>(`${this.baseUrl}/revistas/editoriales`,magazineJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  addMagazinePublisher (publisher:MagazinePublisher):Observable<any>{

    const magazineJson = JSON.stringify(publisher);
    return this.http.post<any>(`${this.baseUrl}/revistas/editoriales`,magazineJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  deleteMagazinePublisherById (id:number):Observable<any> {
    return this.http.delete<boolean>(`${this.baseUrl}/revistas/editoriales/${id}`)
      .pipe(
         catchError ( error => {
          return throwError( () => error);
      })
    );
  }

  getMagazinePublishers():Observable<MagazinePublisher[]>{
    return this.http.get<MagazinePublisher[]>(`${this.baseUrl}/revistas/editoriales`);
  }
}
