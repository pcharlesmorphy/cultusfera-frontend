import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TransactionStatus, FrontendTransaction } from '../interfaces/Transaction.interface';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  private baseUrl: string = environments.baseUrl;
  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};
  public status:TransactionStatus[]=[];


  constructor(private http:HttpClient) { }


  getHistoricalByResource(title:string):Observable<FrontendTransaction[]>{
      return this.http.get<FrontendTransaction[]>(`${this.baseUrl}/recursos/historicos/${title}`)
      .pipe(
        catchError ( error => {
          return throwError( () => error);
        })
    )
  }

  getHistoricalByUser(name:string,surnames:string):Observable<FrontendTransaction[]>{
      return this.http.get<FrontendTransaction[]>(`${this.baseUrl}/usuarios/historicos/?name=${name}&surnames=${surnames}`)
      .pipe(
        catchError ( error => {
          return throwError( () => error);
        })
    )
  }

  getHistoricalByUsername (username:string):Observable<FrontendTransaction[]>{
      return this.http.get<FrontendTransaction[]>(`${this.baseUrl}/usuarios/historicos/username/${username}`)
      .pipe(
        catchError ( error => {
          return throwError( () => error);
        })
    )
  }

  get getTransactionStatus():TransactionStatus[]{
      this.status = [
        { id:1,type:'Prestamo en curso'},
        { id:2,type:'Prestamo finalizado'},
        { id:3,type:'Prestamo vencido'},
        { id:4,type:'Reserva en curso'},
        { id:5,type:'Reserva finalizada'},
      ];
      return this.status;
  }
}

