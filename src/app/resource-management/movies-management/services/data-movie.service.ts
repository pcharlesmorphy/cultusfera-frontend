import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/Movie.interface';

@Injectable({
  providedIn: 'root'
})
export class DataMovieService {


  public movie:Movie ={
    title:'',
    synopsis:'',
    duration:0,
    director:{id:0,name:'',surnames:''},
    actors:[{id:0,name:'',surnames:''}],
    publishedYear:0,
    genre:{id:0,name:''},
    language:{id:0,name:''}
  };

  set setMovie(movie:Movie){
    this.movie = movie;
  }

  get getMovie(){
    return this.movie;
  }
}
