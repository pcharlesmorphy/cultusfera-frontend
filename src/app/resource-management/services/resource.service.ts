import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError, forkJoin, map } from 'rxjs';
import { Resource } from 'src/app/shared/interfaces/Resource.interface';
import { StatusCopy, Location, Copy} from '../../copy-management/interfaces/Copy.interface';
import { environments } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private baseUrl: string = environments.baseUrl;
  public httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})};
  public statusCopies:StatusCopy[] = [];
  public locations:Location[] = [];

  constructor(private http:HttpClient) { }

  //Operaciones CRUD

  getAllResources ():Observable<Resource[]>{
    return this.http.get<Resource[]>(`${this.baseUrl}/recursos`)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    )
  }

  addCopy (copy:Copy):Observable<Copy>{

    const copyJson = JSON.stringify(copy);

    return this.http.post<Copy>(`${this.baseUrl}/recursos/copias`,copyJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }


  updateCopy(copy:Copy):Observable<Copy>{
    const copyJson = JSON.stringify(copy);

    return this.http.put<Copy>(`${this.baseUrl}/recursos/copias`,copyJson,this.httpOptions)
    .pipe(
      catchError ( error => {
        return throwError (() => error);
      })
    );
  }

  getAllCopies ():Observable<Copy[]>{
    return this.http.get<Copy[]>(`${this.baseUrl}/recursos/copias`)
      .pipe(
        catchError ( error => {
          return throwError (() => error);
        })
    )
  }

  getResourcesCopies (id:number):Observable<Copy[]>{
    return this.http.get<Copy[]>(`${this.baseUrl}/recursos/copias/${id}`)
      .pipe(
        catchError ( error => {
          return throwError (() => error);
        })
    )
  }

  addCopiesToResource () {
      return forkJoin([
        this.http.get(`${this.baseUrl}/recursos`),
        this.http.get(`${this.baseUrl}/recursos/copias`)
      ]).pipe(
          map((data: any[]) => {
              let resources: Resource[] = data[0];
              let copies: Copy[] = data[1];
              for (const resource of resources){
                const resourcesCopies = copies.filter ((copy:any) => copy.resource.id === resource.id);
                resource.copies=resourcesCopies;
              }
              return resources;
          })
      );
  }


  getResourceById (id:number):Observable<Resource>{
    return this.http.get<Resource>(`${this.baseUrl}/recursos/${id}`)
      .pipe(
        catchError ( error => {
          return throwError (() => error);
        })
      )
}

   /*Datos precargados en local
  Datos como Location o Género, o Idioma que no cambian, los ponemos en objetos igual
  que los datos del servidor. De esta manera llenamos los dropdown
  del formulario y son introducidos al crear un libro y añadirlo en la
  base de datos.*/


  get getStatus():StatusCopy[]{
    this.statusCopies = [
      { id:1,status:'Disponible'},
      { id:2,status:'Reservado'},
      { id:3,status:'Prestado'},
      { id:4,status:'Perdido'},
      { id:5,status:'Baja'},
    ];
    return this.statusCopies;
  }

  get getLocations():Location[]{
    this.locations = [
      { id: 1, name:'Don Quijote', address:'Diputación 54', phone: '934567835'},
      { id: 2, name:'Sherlock Holmes', address:'Diagonal 661', phone: '934823147'},
      { id: 3, name:'Hamlet', address:'Balmes 39' ,phone:'934424423'},
      { id: 4, name:'Robinson Crusoe', address:'Gran Via 234', phone: '934467259'},
      { id: 5, name:'Oliver Twist', address:'Sardenya 229', phone: '934122012'}
    ];
    return this.locations;
  }
}
