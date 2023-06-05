import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, tap, of, throwError, catchError } from 'rxjs';
import { UserLogin } from '../interfaces/UserLogin.interface';
import { User } from 'src/app/user-management/interface/User.interface';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};
  private user!:any;
  public isLogged:Observable<boolean>;


  constructor(private http:HttpClient) {

    this.isLogged = of(false);
  }

  //Operaciones CRUD

  login (userLogin: UserLogin):Observable<User>{

    return this.http.get<User>(`${this.baseUrl}/usuarios/login?username=${userLogin.username}&password=${userLogin.password}`)
    .pipe(
      tap( user => this.user = user),
      tap( user => sessionStorage.setItem ('loggedInUser',JSON.stringify(user)),
      catchError ( error => {
        return throwError (() => error);
      })
      ));
  }

  logout():void {
    this.user =  undefined;
    this.isLogged = of(false);
    window.sessionStorage.removeItem('loggedInUser');
  }

  getUser():User{
    return structuredClone(this.user);
  }

  setUser(user:User):void{
    this.user = user;
  }

  checkLogin(): Observable<boolean>{
    if (!sessionStorage.getItem('loggedInUser')) return of (false);
    else {
      this.isLogged = of(true);
      return this.isLogged;
    }
  }

}
