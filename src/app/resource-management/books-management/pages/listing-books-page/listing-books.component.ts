import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Book } from '../../interfaces/Book.interface';
import { BookService } from '../../services/book.service';
import { User } from 'src/app/user-management/interface/User.interface';



@Component({
  selector: 'app-listing-books-page',
  templateUrl: './listing-books.component.html',
  styleUrls: [ './listing-books.component.css'
  ]
})
export class ListingBooksPageComponent implements OnInit,OnChanges{

  public title:string = 'Listar Libros';
  public books:Book[] = [];
  public user!:User;

  constructor (
    private bookService:BookService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getBooks();
  }

  ngOnInit(): void {
    this.getBooks();
    this.user = JSON.parse(sessionStorage.getItem('loggedInUser')!);
  }

  getBooks():void{
    this.bookService.getBooks().subscribe ({
      next: (resp) => {
         this.books = resp;
         console.log("Lista Libros:",resp);
      }
   });
  }
}



