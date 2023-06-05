import { Movie } from './../../interfaces/Movie.interface';
import { Component, SimpleChanges } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { User } from 'src/app/user-management/interface/User.interface';


@Component({
  selector: 'app-listing-movies-page',
  templateUrl: './listing-movies-page.component.html',
  styleUrls: ['./listing-movies-page.component.css']
})
export class ListingMoviesPageComponent {

  public title:string = 'Listar Peliculas';
  public movies:Movie[] = [];
  public user!:User;

  constructor (
    private movieService:MovieService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getBooks();
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('loggedInUser')!);
    this.getBooks();
  }

  getBooks():void{
    this.movieService.getMovies().subscribe ({
      next: (resp) => {
         this.movies = resp;
      }
   });
  }
}
