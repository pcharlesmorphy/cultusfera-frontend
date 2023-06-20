import { Component, EventEmitter, OnInit } from '@angular/core';
import { Movie } from 'src/app/resource-management/movies-management/interfaces/Movie.interface';
import { DataMovieService } from 'src/app/resource-management/movies-management/services/data-movie.service';
import { Copy } from 'src/app/copy-management/interfaces/Copy.interface';
import { User } from 'src/app/user-management/interface/User.interface';
import { TransactionService } from 'src/app/transaction-management/service/transaction.service';
import { Transaction } from 'src/app/historic-search/interfaces/Transaction.interface';
import { MessageService } from 'primeng/api';
import { MovieService } from 'src/app/resource-management/movies-management/services/movie.service';

@Component({
  selector: 'app-view-movie-page',
  templateUrl: './view-movie-page.component.html',
  styleUrls: ['./view-movie-page.component.css']
})
export class ViewMoviePageComponent implements OnInit{
  public movie:Movie;
  public copy!:Copy;
  public booking!:Transaction;
  public user:User;
  public list:Movie[]=[];
  public copies:Copy[]=[];
  public title:string='Ficha Película';
  public titleCopy:string='Copias';
  public titleComment:string='Comentarios';
  public averageRating:number;
  public onUpdateBooking: EventEmitter<void> = new EventEmitter<void>;

  constructor(
    private movieService:MovieService,
    private dataMovie:DataMovieService,
    private transactionService:TransactionService,
    private messageService:MessageService){
    this.movie = dataMovie.getMovie;
    this.user = JSON.parse(sessionStorage.getItem('loggedInUser')!);
    this.copies = this.movie.copies!;
    this.averageRating = this.movie.rating!;
  }

  ngOnInit(): void {
    this.onUpdateBooking.subscribe (() => {
      this.handleUpdateBooking();
    })
  }

  saveBooking (copy:Copy) {
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
    console.log(this.booking);
  }

  handleUpdateBooking(){
    this.movieService.getMovieById(this.movie.id!).subscribe({
      next: (resp) => {
        this.movie = resp;
        this.copies = this.movie.copies!;
      }
    });
  }

}



