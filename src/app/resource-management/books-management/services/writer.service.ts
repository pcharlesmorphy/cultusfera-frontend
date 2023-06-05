import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Writer } from '../interfaces/Book.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WriterService {

  private baseUrl: string = environments.baseUrl;

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};


  constructor(private http:HttpClient) { }

  //Operaciones CRUD

  getWriterById (id:number):Observable<Writer>{
      return this.http.get<Writer>(`${this.baseUrl}/autores/escritores/${id}`)
        .pipe(
          catchError ( error => {
            return throwError (() => error);
          })
        )
  }

  updateWriter(writer:Writer):Observable<Writer>{
    const bookJson = JSON.stringify(writer);
    return this.http.put<Writer>(`${this.baseUrl}/autores/escritores`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  addWriter (writer:Writer):Observable<any>{

    const bookJson = JSON.stringify(writer);
    return this.http.post<any>(`${this.baseUrl}/autores/escritores`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  deleteWriterById (id:number):Observable<any> {
    return this.http.delete<boolean>(`${this.baseUrl}/autores/escritores/${id}`)
      .pipe(
         catchError ( error => {
          return throwError( () => error);
      })
    );
  }

  getWriters():Observable<Writer[]>{
    return this.http.get<Writer[]>(`${this.baseUrl}/autores/escritores`);
  }

}
