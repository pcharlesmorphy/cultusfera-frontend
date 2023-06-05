import { Injectable } from '@angular/core';
import { Magazine, MagazinePublisher, MagazineSubject, Month } from '../interfaces/Magazine.interface';
import { Language } from '../../books-management/interfaces/Book.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MagazineService {

  private baseUrl: string = environments.baseUrl;
  public subjects!: MagazineSubject[];
  public languages!:Language[];
  public months!:Month[];
  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};


  constructor(private http:HttpClient) { }

  //Operaciones CRUD

  getMagazines ():Observable<Magazine[]>{
      return this.http.get<Magazine[]>(`${this.baseUrl}/revistas`);
  }

  getMagazineById (id:number):Observable<Magazine>{
      return this.http.get<Magazine>(`${this.baseUrl}/revistas/${id}`)
        .pipe(
          catchError ( error => {
            return throwError (() => error);
          })
        )
  }

  updateMagazine(magazine:Magazine):Observable<Magazine>{
    const magazineJson = JSON.stringify(magazine);
    return this.http.put<Magazine>(`${this.baseUrl}/revistas`,magazineJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  addMagazine (magazine:Magazine):Observable<any>{

    const magazineJson = JSON.stringify(magazine);
    return this.http.post<any>(`${this.baseUrl}/revistas`,magazineJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  getPublishers():Observable<MagazinePublisher[]>{
    return this.http.get<MagazinePublisher[]>(`${this.baseUrl}/revistas/editoriales`);
  }

  deleteMagazineById (id:number):Observable<any> {
    return this.http.delete<boolean>(`${this.baseUrl}/revistas/${id}`)
      .pipe(
         catchError ( error => {
          return throwError( () => error);
      })
    );
  }

  getMagazinesByTitle (title:string):Observable<Magazine[]>{
    return this.http.get<Magazine[]>(`${this.baseUrl}/revistas/titulo/${title}`)
      .pipe(
          catchError ( error => {
            return throwError( () => error);
          })
      )
  }


  getMagazinesBySubject (id:number,name:string):Observable<Magazine[]>{
    return this.http.get<Magazine[]>(`${this.baseUrl}/revistas/temas/?id=${id}&nombre=${name}`)
      .pipe(
        catchError ( error => {
          return throwError( () => error);
        })
    )
  }

  getMagazinesByLanguage (id:number,name:string):Observable<Magazine[]>{
    return this.http.get<Magazine[]>(`${this.baseUrl}/revistas/idiomas/?id=${id}&nombre=${name}`)
      .pipe(
        catchError ( error => {
          return throwError( () => error);
        })
    )
  }



  /*Datos precargados en local
  Datos como Género, o Idioma que no cambian, los ponemos en objetos igual
  que los datos del servidor. De esta manera llenamos los dropdown
  del formulario y son introducidos al crear un libro y añadirlo en la
  base de datos.*/


  get getSubjects():MagazineSubject[]{
    this.subjects = [
      { id:1,name:'Informática'},
      { id:2,name:'Literatura'},
      { id:3,name:'Moda'},
      { id:4,name:'Cocina'},
      { id:5,name:'Ciencia'},
      { id:6,name:'Cultura'},
      { id:7,name:'Economía'},
      { id:8,name:'Música'},
      { id:9,name:'Educación'},
      { id:10,name:'Viajes'},
      { id:11,name:'Deportes'},
      { id:12,name:'Arte'},
      { id:13,name:'Política'},
      { id:14,name:'Aficiones'},
      { id:15,name:'Tecnología'},
      { id:16,name:'Juegos de Mesa'}
    ];
    return this.subjects;
  }

  get getLanguages():Language[]{
    this.languages = [
      { id: 1, name:'Español'},
      { id: 2, name:'Catalán'},
      { id: 3, name:'Inglés'},
      { id: 4, name:'Francés'},
      { id: 5, name:'Italiano'},
      { id: 6, name:'Portugués'},
      { id: 7, name:'Alemán'},
      { id: 8, name:'Chino'},
      { id: 9, name:'Japonés'},
      { id: 10, name:'Ruso'}
    ];
    return this.languages;
  }

  get getMonths():Month[]{
    this.months = [
      { id: 1, name:'Enero'},
      { id: 2, name:'Febrero'},
      { id: 3, name:'Marzo'},
      { id: 4, name:'Abril'},
      { id: 5, name:'Mayo'},
      { id: 6, name:'Junio'},
      { id: 7, name:'Julio'},
      { id: 8, name:'Agosto'},
      { id: 9, name:'Septiembre'},
      { id: 10, name:'Octubre'},
      { id: 11, name:'Noviembre'},
      { id: 12, name:'Diciembre'}
    ];
    return this.months;
  }
}
