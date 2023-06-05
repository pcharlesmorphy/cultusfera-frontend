import { Component, SimpleChanges } from '@angular/core';
import { DirectorService } from '../../services/director.service';
import { Director } from '../../interfaces/Movie.interface';

@Component({
  selector: 'app-listing-directors-page',
  templateUrl: './listing-directors-page.component.html',
  styleUrls: ['./listing-directors-page.component.css']
})
export class ListingDirectorsPageComponent {
  public title:string = 'Listar Escritores';
  public directors:Director[] = [];

  constructor (
    private directorService:DirectorService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getDirectors();
  }

  ngOnInit(): void {
    this.getDirectors();
  }

  getDirectors():void{
    this.directorService.getDirectors().subscribe ({
      next: (resp) => {
         this.directors = resp;
      }
   });


  }
}
