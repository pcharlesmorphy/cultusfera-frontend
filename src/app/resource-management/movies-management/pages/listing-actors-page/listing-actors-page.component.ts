import { Component, SimpleChanges } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { Actor } from '../../interfaces/Movie.interface';

@Component({
  selector: 'app-listing-actors-page',
  templateUrl: './listing-actors-page.component.html',
  styleUrls: ['./listing-actors-page.component.css']
})
export class ListingActorsPageComponent {
  public title:string = 'Listar Escritores';
  public actors:Actor[] = [];

  constructor (
    private actorService:ActorService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getWriters();
  }

  ngOnInit(): void {
    this.getWriters();
  }

  getWriters():void{
    this.actorService.getActors().subscribe ({
      next: (resp) => {
         this.actors = resp;
      }
   });


  }
}
