import { Component, SimpleChanges } from '@angular/core';
import { Writer } from '../../interfaces/Book.interface';
import { WriterService } from '../../services/writer.service';

@Component({
  selector: 'app-listing-writers-page',
  templateUrl: './listing-writers-page.component.html',
  styleUrls: ['./listing-writers-page.component.css']
})
export class ListingWritersPageComponent {
  public title:string = 'Listar Escritores';
  public writers:Writer[] = [];

  constructor (
    private writerService:WriterService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getWriters();
  }

  ngOnInit(): void {
    this.getWriters();
  }

  getWriters():void{
    this.writerService.getWriters().subscribe ({
      next: (resp) => {
         this.writers = resp;
      }
   });


  }
}
