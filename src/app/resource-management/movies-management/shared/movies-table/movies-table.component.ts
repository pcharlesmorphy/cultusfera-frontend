import { MovieService } from './../../services/movie.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataMovieService } from '../../services/data-movie.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Movie } from '../../interfaces/Movie.interface';
import { User } from 'src/app/user-management/interface/User.interface';
import { Resource } from 'src/app/shared/interfaces/Resource.interface';
import { DataResourceService } from 'src/app/shared/services/data-resource.service';

@Component({
  selector: 'shared-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.css']
})
export class MoviesTableComponent {
  @Input('title') title: string = '';
  @Input('movies') movies: Movie[] = [];
  @Input('user') public user!:User;

  @Output() onDeleteBook:EventEmitter<Movie> = new EventEmitter<Movie>();

  constructor (
    private movieService:MovieService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    private dataMovie:DataMovieService,
    private dataResource: DataResourceService ) {}

  onDelete(movie:Movie){
    this.movieService.deleteMovieById(movie.id!).subscribe({
      error: (e) =>  {
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
        setTimeout (()=>{
          location.reload();
        },1000);
      },
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:`Pelicula ${movie.title} eliminada con éxito`})
    });
    this.movies = this.movies.filter ( m => m.id !== movie.id);
  }

  confirmDelete(movie:Movie){
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quiere borrar esta película?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.onDelete(movie);
      },
      reject: (type:any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: `Cancelaste eliminar la pelicula ${movie.title}` });
                  break;
          }
      }
    });

  }

  getDataMovie(movie:Movie):void{
      this.dataMovie.movie = movie;
  }

  getDataResource (resource:Resource):void{
    this.dataResource.resource = resource;
}

}
