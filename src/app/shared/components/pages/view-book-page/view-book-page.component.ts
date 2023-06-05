import { Component, EventEmitter, OnInit } from '@angular/core';
import { DataBookService } from 'src/app/resource-management/books-management/services/data-book.service';
import { Book } from 'src/app/resource-management/books-management/interfaces/Book.interface';
import { Copy } from 'src/app/copy-management/interfaces/Copy.interface';
import { User } from 'src/app/user-management/interface/User.interface';
import { TransactionService } from 'src/app/transaction-management/service/transaction.service';
import { Transaction } from 'src/app/historic-search/interfaces/Transaction.interface';
import { MessageService } from 'primeng/api';
import { BookService } from 'src/app/resource-management/books-management/services/book.service';

@Component({
  selector: 'app-view-book-page',
  templateUrl: './view-book-page.component.html',
  styleUrls: ['./view-book-page.component.css']
})
export class ViewBookPageComponent implements OnInit{

    public copies:Copy[]=[];
    public copy!:Copy;
    public booking!:Transaction;
    public book!:Book;
    public user!:User;
    public list:Book[]=[];
    public title:string='Ficha Libro';
    public titleCopy:string='Copias';
    public titleComment:string='Comentarios';

    public onUpdateBooking: EventEmitter<void> = new EventEmitter<void>;


    constructor(
      private dataBook:DataBookService,
      private bookService:BookService,
      private transactionService:TransactionService,
      private messageService:MessageService){

      this.book = dataBook.getBook;
      this.copies = this.book.copies!;
      this.user = JSON.parse(sessionStorage.getItem('loggedInUser')!);

    }

    ngOnInit(): void {
      this.onUpdateBooking.subscribe (() => {
        this.handleUpdateBooking();
      })
    }


    saveBooking (copy:Copy) {
      console.log("Entro en salvar Prestamo");
      this.copy = copy;
      this.bookingData();
      this.transactionService.addBooking(this.booking).subscribe ({
        error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'La reserva no se ha podido realizar. Intente más tarde'}),
        complete: () => {
          this.messageService.add({severity:'success',summary:'Success',detail:'Reserva realizada con éxito'});
          this.onUpdateBooking.emit();
        }
      });
    }

    deleteBooking (copy:Copy){
      let bookingId:number|undefined = this.searchBookingCopy(copy.transactions!);

      this.transactionService.deleteBooking(bookingId!).subscribe ({
        error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'La reserva no se ha podido cancelar. Intente más tarde'}),
        complete: () => {
          this.messageService.add({severity:'success',summary:'Success',detail:'Reserva cancelada con éxito'});
          this.onUpdateBooking.emit();
        }
      });
    }

    searchBookingCopy (transactions:Transaction[]):number|undefined{
      for(let t of transactions){
        if (t.status?.type === 'Reserva en curso'){
          return t.id;
        }
      }
      return undefined;
    }

    checkBookingUser(copy:Copy):boolean{
      let transactions:Transaction[]|undefined = copy.transactions;
      for(let t of transactions!){
        if (t.status?.type === 'Reserva en curso'){
            if (t.userId === this.user.id){
              return true;
            }
        }
      }
      return false;
    }


    bookingData ():void{

      this.booking = {
        startDate:new Date(Date.now()),
        userId:this.user.id!,
        copyId:this.copy.id!,
      }

    }

    handleUpdateBooking(){
      this.bookService.getBookById(this.book.id!).subscribe({
        next: (resp) => {
          this.book = resp;
          this.copies = this.book.copies!;
      }
      });
  }
}
