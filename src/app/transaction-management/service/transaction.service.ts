import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable,Subject,catchError, throwError, tap } from 'rxjs';
import { ReturnLoan } from '../interface/Loan.interface';
import { Transaction, FrontendTransaction } from 'src/app/historic-search/interfaces/Transaction.interface';
import { environments } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl: string = environments.baseUrl;
  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};
  public transactions:Transaction[]=[];

   constructor(
    private http:HttpClient
  ) { }


  addLoan (loan:Transaction):Observable<any>{
    const userJson = JSON.stringify(loan);
    return this.http.post<Transaction>(`${this.baseUrl}/transacciones/prestamos`,userJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  returnLoan (returnLoan:ReturnLoan):Observable<any>{
    const userJson = JSON.stringify(returnLoan);

    return this.http.patch<any>(`${this.baseUrl}/transacciones/prestamos`,userJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }


  addBooking (booking:Transaction):Observable<any>{
    const userJson = JSON.stringify(booking);
    return this.http.post<Transaction>(`${this.baseUrl}/transacciones/reservas`,userJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  deleteBooking (id:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/transacciones/reservas/${id}`)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  getActiveUserLoan (username:string):Observable<any>{
     return this.http.get<Transaction>(`${this.baseUrl}/transacciones/prestamos/${username}`)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  getActiveUserBooking (username:string):Observable<any>{
    return this.http.get<Transaction>(`${this.baseUrl}/transacciones/reservas/${username}`)
   .pipe(
     catchError ( error => {
       return throwError (() => error);
     })
   );
 }

  getActiveUserTransactions(name:string,surnames:string):Observable<FrontendTransaction[]>{
    return this.http.get<FrontendTransaction[]>(`${this.baseUrl}/transacciones/?name=${name}&surnames=${surnames}`)
    .pipe(
      catchError ( error => {
        return throwError( () => error);
      })
  )
  }

  getActiveResourceLoans (title:string):Observable<any>{
    return this.http.get<Transaction>(`${this.baseUrl}/recursos/prestamos/${title}`)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }
}
