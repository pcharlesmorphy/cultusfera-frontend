import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from 'src/app/environments/environment';
import { Penalty, PenaltyReason } from '../interfaces/penalty.interface';


@Injectable({
  providedIn: 'root'
})
export class PenaltyService {

  private baseUrl: string = environments.baseUrl;
  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};
  public reasons!:PenaltyReason[];

  constructor(
    private http:HttpClient
  ) { }

  addPenalty (penalty:Penalty):Observable<Penalty>{
    const userJson = JSON.stringify(penalty);
    return this.http.post<Penalty>(`${this.baseUrl}/usuarios/sanciones`,userJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  getPenaltyById (id:number):Observable<Penalty>{
    return this.http.get<Penalty>(`${this.baseUrl}/usuarios/sanciones/${id}`)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  getAllUserPenalties (idUser:number):Observable<Penalty[]>{
    return this.http.get<Penalty[]>(`${this.baseUrl}/usuarios/sanciones/${idUser}`)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    )
  }

  /*
  updateUser (user:User):Observable<User>{
    const userJson = JSON.stringify(user);
    return this.http.put<User>(`${this.baseUrl}/usuarios`,userJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  updateUserByUser (user:UpdateUser):Observable<any>{
    const userJson = JSON.stringify(user);
    return this.http.patch<UpdateUser>(`${this.baseUrl}/usuarios`,userJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  updateUserPassword (id:number,password:string):Observable<any>{
    const body = {id,password}
    const bodyJson = JSON.stringify(body);
    return this.http.patch<any>(`${this.baseUrl}/usuarios/password`,bodyJson,this.httpOptions)
  }

  getUsers ():Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/usuarios`);
  }

  getClientUsers ():Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/usuarios/clientes`);
  }

  */


  get getPenaltyReasons():PenaltyReason[]{
    this.reasons = [
      { id: 1, reason:'Retraso devolución'},
      { id: 2, reason:'Incumplimiento normas'},
      { id: 3, reason:'Pérdida recurso'},
      { id: 4, reason:'Deterioro recurso'},
    ];
    return this.reasons;
  }
}
