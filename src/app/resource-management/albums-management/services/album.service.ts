import { Injectable } from '@angular/core';
import { Album, Musician, RecordCompany, MusicGenre } from '../interfaces/Album.interface';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private baseUrl: string = environments.baseUrl;
  public genres!: MusicGenre[];
  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};


  constructor(private http:HttpClient) { }

  //Operaciones CRUD

  getAlbums ():Observable<Album[]>{
      return this.http.get<Album[]>(`${this.baseUrl}/albumes`);
  }

  getAlbumById (id:number):Observable<Album>{
      return this.http.get<Album>(`${this.baseUrl}/albumes/${id}`)
        .pipe(
          catchError ( error => {
            return throwError (() => error);
          })
        )
  }

  updateAlbum(book:Album):Observable<Album>{
    const bookJson = JSON.stringify(book);
    return this.http.put<Album>(`${this.baseUrl}/albumes`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  addAlbum (book:Album):Observable<any>{

    const bookJson = JSON.stringify(book);
    return this.http.post<any>(`${this.baseUrl}/albumes`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  getRecordCompanies():Observable<RecordCompany[]>{
    return this.http.get<RecordCompany[]>(`${this.baseUrl}/albumes/discograficas`);
  }


  getMusicians():Observable<Musician[]>{
    return this.http.get<Musician[]>(`${this.baseUrl}/autores/musicos`);
  }


  deleteAlbumById (id:number):Observable<any> {
    return this.http.delete<boolean>(`${this.baseUrl}/albumes/${id}`)
      .pipe(
         catchError ( error => {
          return throwError( () => error);
      })
    );
  }

  getAlbumsByTitle (title:string):Observable<Album[]>{
    return this.http.get<Album[]>(`${this.baseUrl}/albumes/titulo/${title}`)
      .pipe(
          catchError ( error => {
            return throwError( () => error);
          })
      )
  }

  getAlbumsByMusician (name:string,surnames:string):Observable<Album[]>{

    const url = `${this.baseUrl}/albumes/musicos/?nombre=${name}&apellidos=${surnames}`;

    return this.http.get<Album[]>(url)
    .pipe(
      catchError ( error => {
        return throwError ( () => error );
      })
    )
  }


  getAlbumsByGenre (id:number,name:string):Observable<Album[]>{
    return this.http.get<Album[]>(`${this.baseUrl}/albumes/generos/?id=${id}&nombre=${name}`)
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


  get getGenres():MusicGenre[]{
    this.genres = [
      { id:1,name:'Rock'},
      { id:2,name:'Pop'},
      { id:3,name:'Rap'},
      { id:4,name:'Electrónica'},
      { id:5,name:'Reggae'},
      { id:6,name:'Jazz'},
      { id:7,name:'Blues'},
      { id:8,name:'Clásica'},
      { id:9,name:'Folk'},
      { id:10,name:'Metal'},
      { id:11,name:'Country'},

    ];
    return this.genres;
  }
}





