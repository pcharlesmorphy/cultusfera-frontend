import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { RecordCompany } from '../interfaces/Album.interface';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordCompanyService {

  private baseUrl: string = environments.baseUrl;

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};


  constructor(private http:HttpClient) { }

  //Operaciones CRUD

  getRecordCompanyById (id:number):Observable<RecordCompany>{
      return this.http.get<RecordCompany>(`${this.baseUrl}/albumes/discograficas/${id}`)
        .pipe(
          catchError ( error => {
            return throwError (() => error);
          })
        )
  }

  updateRecordCompany(recordCompany:RecordCompany):Observable<RecordCompany>{
    const bookJson = JSON.stringify(recordCompany);
    return this.http.put<RecordCompany>(`${this.baseUrl}/albumes/discograficas`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  addRecordCompany (recordCompany:RecordCompany):Observable<any>{

    const bookJson = JSON.stringify(recordCompany);
    return this.http.post<any>(`${this.baseUrl}/albumes/discograficas`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  deleteRecordCompanyById (id:number):Observable<any> {
    return this.http.delete<boolean>(`${this.baseUrl}/albumes/discograficas/${id}`)
      .pipe(
         catchError ( error => {
          return throwError( () => error);
      })
    );
  }

  getRecordCompanies():Observable<RecordCompany[]>{
    return this.http.get<RecordCompany[]>(`${this.baseUrl}/albumes/discograficas`);
  }
}
