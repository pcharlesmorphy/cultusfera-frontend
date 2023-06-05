import { Component, Input } from '@angular/core';
import { Book } from '../../../interfaces/Book.interface';
import { BookService } from '../../../services/book.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DataBookService } from '../../../services/data-book.service';
import { User } from 'src/app/user-management/interface/User.interface';
import { DataResourceService } from 'src/app/shared/services/data-resource.service';
import { Resource } from 'src/app/shared/interfaces/Resource.interface';


@Component({
  selector: 'shared-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent {
  @Input('title') title: string = '';
  @Input('books') books: Book[] = [];
  @Input('user') user!:User;

  constructor (
    private bookService:BookService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    private dataBook:DataBookService,
    private dataResource: DataResourceService ) {}

  onDelete(book:Book){
    this.bookService.deleteBookById(book.id!).subscribe({
      error: (e) =>  {
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
        setTimeout (()=>{
          location.reload();
        },1000);
      },
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:`Libro ${book.title} eliminado con éxito`})

    });
    this.books = this.books.filter ( b => b.id !== book.id);
  }

  confirmDelete(book:Book){
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quiere borrar este libro?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.onDelete(book);
      },
      reject: (type:any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: `Cancelaste eliminar el libro ${book.title}` });
                  break;
          }
      }
    });

  }

  getDataBook(book:Book):void{
      this.dataBook.book = book;
  }

  getDataResource (resource:Resource):void{
      this.dataResource.resource = resource;
  }


}
