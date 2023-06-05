import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserRole, UpdateUser } from '../interface/User.interface';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environments.baseUrl;
  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};
  public roles:UserRole[]=[];

  constructor(
    private http:HttpClient
  ) { }

  addUser (user:User):Observable<User>{
    const userJson = JSON.stringify(user);
    return this.http.post<User>(`${this.baseUrl}/usuarios`,userJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  getUserById (id:number):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/usuarios/${id}`)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }


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

  get getUserRoles():UserRole[]{
    this.roles = [
      { id:1,type:'Admin'},
      { id:2,type:'Librarian'},
      { id:3,type:'User'}
    ];
    return this.roles;
  }
}
