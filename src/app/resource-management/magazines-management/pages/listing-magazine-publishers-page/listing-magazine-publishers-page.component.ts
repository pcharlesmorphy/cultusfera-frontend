
import { Component, SimpleChanges } from '@angular/core';
import { MagazinePublisher } from '../../interfaces/Magazine.interface';
import { MagazinePublisherService } from '../../services/magazine-publisher.service';

@Component({
  selector: 'app-listing-magazine-publishers-page',
  templateUrl: './listing-magazine-publishers-page.component.html',
  styleUrls: ['./listing-magazine-publishers-page.component.css']
})
export class ListingMagazinePublishersPageComponent {
  public title:string = 'Listar Editoriales';
  public publishers:MagazinePublisher[] = [];

  constructor (
    private magazinePublisherService:MagazinePublisherService ) {}

  ngOnChanges(changes: SimpleChanges ): void {
    this.getBookPublishers();
  }

  ngOnInit(): void {
    this.getBookPublishers();
  }

  getBookPublishers():void{
    this.magazinePublisherService.getMagazinePublishers().subscribe ({
      next: (resp) => {
         this.publishers = resp;
      }
   });
  }
}
