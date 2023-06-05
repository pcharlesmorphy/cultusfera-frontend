import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Book,LiteraryGenre, BookPublisher, Language, Writer } from '../interfaces/Book.interface';
import { environments } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl: string = environments.baseUrl;
  public genres!: LiteraryGenre[];
  public languages!:Language[];
  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};


  constructor(private http:HttpClient) { }

  //Operaciones CRUD

  getBooks ():Observable<Book[]>{
      return this.http.get<Book[]>(`${this.baseUrl}/libros`);
  }

  getBookById (id:number):Observable<Book>{
      return this.http.get<Book>(`${this.baseUrl}/libros/${id}`)
        .pipe(
          catchError ( error => {
            return throwError (() => error);
          })
        )
  }

  updateBook(book:Book):Observable<Book>{
    const bookJson = JSON.stringify(book);
    return this.http.put<Book>(`${this.baseUrl}/libros`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  addBook (book:Book):Observable<any>{

    const bookJson = JSON.stringify(book);
    return this.http.post<any>(`${this.baseUrl}/libros`,bookJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  getPublishers():Observable<BookPublisher[]>{
    return this.http.get<BookPublisher[]>(`${this.baseUrl}/libros/editoriales`);
  }


  getWriters():Observable<Writer[]>{
    return this.http.get<Writer[]>(`${this.baseUrl}/autores/escritores`);
  }


  deleteBookById (id:number):Observable<any> {
    return this.http.delete<boolean>(`${this.baseUrl}/libros/${id}`)
      .pipe(
         catchError ( error => {
          return throwError( () => error);
      })
    );
  }

  getBooksByTitle (title:string):Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/libros/titulo/${title}`)
      .pipe(
          catchError ( error => {
            return throwError( () => error);
          })
      )
  }

  getBooksByWriter (name:string,surnames:string):Observable<Book[]>{

    const url = `${this.baseUrl}/libros/autores/?nombre=${name}&apellidos=${surnames}`;

    return this.http.get<Book[]>(url)
    .pipe(
      catchError ( error => {
        return throwError ( () => error );
      })
    )
  }

  getBooksByIsbn (isbn:string):Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/libros/isbn/${isbn}`)
      .pipe(
          catchError ( error => {
            return throwError( () => error);
          })
      )
  }

  getBooksByGenre (id:number,name:string):Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/libros/generos/?id=${id}&nombre=${name}`)
      .pipe(
        catchError ( error => {
          return throwError( () => error);
        })
    )
  }

  getBooksByLanguage (id:number,name:string):Observable<Book[]>{
    return this.http.get<Book[]>(`${this.baseUrl}/libros/idiomas/?id=${id}&nombre=${name}`)
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


  get getGenres():LiteraryGenre[]{
    this.genres = [
      { id:1,name:'Thriller'},
      { id:2,name:'Histórico'},
      { id:3,name:'Terror'},
      { id:4,name:'Poesía'},
      { id:5,name:'Novela'},
      { id:6,name:'Cuento'},
      { id:7,name:'Biografía'},
      { id:8,name:'Ensayo'},
      { id:9,name:'Informática'},
      { id:10,name:'Ciencia Ficción'},
      { id:11,name:'Infantil'},
      { id:12,name:'Ciencia'},
      { id:13,name:'Teatro'},
      { id:14,name:'Deporte'},
      { id:15,name:'Juegos'},
      { id:16,name:'Arte'},
      { id:17,name:'Comedia'},
      { id:18,name:'Romance'},
      { id:19,name:'Aventuras'},
      { id:20,name:'Ajedrez'},

    ];
    return this.genres;
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

}
