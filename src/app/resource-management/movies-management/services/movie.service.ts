import { Movie, MovieGenre, Director, Actor } from '../interfaces/Movie.interface';
import { Injectable } from '@angular/core';
import { Language} from '../../books-management/interfaces/Book.interface';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl: string = environments.baseUrl;
  public genres!: MovieGenre[];
  public languages!:Language[];
  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};


  constructor(private http:HttpClient) { }

  //Operaciones CRUD

  getMovies ():Observable<Movie[]>{
      return this.http.get<Movie[]>(`${this.baseUrl}/peliculas`);
  }

  getMovieById (id:number):Observable<Movie>{
      return this.http.get<Movie>(`${this.baseUrl}/peliculas/${id}`)
        .pipe(
          catchError ( error => {
            return throwError (() => error);
          })
        )
  }

  updateMovie(movie:Movie):Observable<Movie>{
    const movieJson = JSON.stringify(movie);

    return this.http.put<Movie>(`${this.baseUrl}/peliculas`,movieJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  addMovie (movie:Movie):Observable<any>{

    const movieJson = JSON.stringify(movie);
    return this.http.post<any>(`${this.baseUrl}/peliculas`,movieJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  getDirectors ():Observable<Director[]>{
    return this.http.get<Director[]>(`${this.baseUrl}/autores/directores`);
  }

  getActors ():Observable<Actor[]>{
    return this.http.get<Actor[]>(`${this.baseUrl}/autores/actores`);
  }



  deleteMovieById (id:number):Observable<any> {
    return this.http.delete<boolean>(`${this.baseUrl}/peliculas/${id}`)
      .pipe(
         catchError ( error => {
          return throwError( () => error);
      })
    );
  }

  getMoviesByTitle (titulo:string):Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.baseUrl}/peliculas/titulo/${titulo}`)
      .pipe(
          catchError ( error => {
            return throwError( () => error);
          })
      )
  }

  getMoviesByDirector (nombre:string,apellidos:string):Observable<Movie[]>{

    const url = `${this.baseUrl}/peliculas/directores/?nombre=${nombre}&apellidos=${apellidos}`;
    console.log(url);

    return this.http.get<Movie[]>(url)
    .pipe(
      catchError ( error => {
        return throwError ( () => error );
      })
    )
  }

  getMoviesByActor (nombre:string, apellidos:string):Observable<Movie[]>{
    const url = `${this.baseUrl}/peliculas/actores/?nombre=${nombre}&apellidos=${apellidos}`;

    return this.http.get<Movie[]>(url)
    .pipe(
      catchError ( error => {
        return throwError ( () => error );
      })
    )
  }

  getMoviesByGenre (id:number,name:string):Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.baseUrl}/peliculas/generos/?id=${id}&nombre=${name}`)
      .pipe(
        catchError ( error => {
          return throwError( () => error);
        })
    )
  }

  getMoviesByLanguage (id:number,name:string):Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.baseUrl}/peliculas/idiomas/?id=${id}&nombre=${name}`)
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


  get getGenres():MovieGenre[]{
    this.genres = [
      { id:1,name:'Acción'},
      { id:2,name:'Comedia'},
      { id:3,name:'Drama'},
      { id:4,name:'Bélica'},
      { id:5,name:'Western'},
      { id:6,name:'Terror'},
      { id:7,name:'Romántica'},
      { id:8,name:'Ciencia Ficción'},
      { id:9,name:'Animación'},
      { id:10,name:'Aventuras'},
      { id:11,name:'Thriller'},
      { id:12,name:'Infantil'},
      { id:13,name:'Documental'},

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
