import { Component, SimpleChanges } from '@angular/core';
import { BookPublisher } from '../../interfaces/Book.interface';
import { BookPublisherService } from '../../services/book-publisher.service';

@Component({
  selector: 'app-listing-book-publishers-page',
  templateUrl: './listing-book-publishers-page.component.html',
  styleUrls: ['./listing-book-publishers-page.component.css']
})
export class ListingBookPublishersPageComponent {
  public title:string = 'Listar Editoriales';
  public publishers:BookPublisher[] = [];

  constructor (
    private bookPublisherService:BookPublisherService ) {}

  ngOnChanges(changes: SimpleChanges ): void {
    this.getBookPublishers();
  }

  ngOnInit(): void {
    this.getBookPublishers();
  }

  getBookPublishers():void{
    this.bookPublisherService.getBookPublishers().subscribe ({
      next: (resp) => {
         this.publishers = resp;
      }
   });
  }
}
