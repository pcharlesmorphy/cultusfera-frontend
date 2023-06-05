import { Component, SimpleChanges } from '@angular/core';
import { Musician } from '../../interfaces/Album.interface';
import { MusicianService } from '../../services/musician.service';

@Component({
  selector: 'app-listing-musicians-page',
  templateUrl: './listing-musicians-page.component.html',
  styleUrls: ['./listing-musicians-page.component.css']
})
export class ListingMusiciansPageComponent {

  public title:string = 'Listar Escritores';
  public musicians:Musician[] = [];

  constructor (
    private writerService:MusicianService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getMusicians();
  }

  ngOnInit(): void {
    this.getMusicians();
  }

  getMusicians():void{
    this.writerService.getMusicians().subscribe ({
      next: (resp) => {
         this.musicians = resp;
      }
   });

  }
}
