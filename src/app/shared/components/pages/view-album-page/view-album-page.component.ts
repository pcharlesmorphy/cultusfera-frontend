import { Component, EventEmitter, OnInit } from '@angular/core';
import { Album } from 'src/app/resource-management/albums-management/interfaces/Album.interface';
import { DataAlbumService } from 'src/app/resource-management/albums-management/services/data-album.service';
import { Copy } from 'src/app/copy-management/interfaces/Copy.interface';
import { Transaction } from 'src/app/historic-search/interfaces/Transaction.interface';
import { TransactionService } from 'src/app/transaction-management/service/transaction.service';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/user-management/interface/User.interface';
import { AlbumService } from 'src/app/resource-management/albums-management/services/album.service';

@Component({
  selector: 'app-view-album-page',
  templateUrl: './view-album-page.component.html',
  styleUrls: ['./view-album-page.component.css']
})
export class ViewAlbumPageComponent implements OnInit{
  public album:Album;
  public list:Album[]=[];
  public user!:User;
  public copy!:Copy;
  public booking!:Transaction;
  public copies:Copy[]=[];
  public title:string='Ficha Album';
  public titleCopy:string='Copias';
  public titleComment:string='Comentarios';
  public onUpdateBooking: EventEmitter<void> = new EventEmitter<void>;

  constructor(
    private albumService:AlbumService,
    private dataAlbum:DataAlbumService,
    private transactionService:TransactionService,
    private messageService:MessageService){

    this.album = dataAlbum.getAlbum;
    this.user = JSON.parse(sessionStorage.getItem('loggedInUser')!);
    this.copies = this.album.copies!;
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
  }

  handleUpdateBooking(){
    this.albumService.getAlbumById(this.album.id!).subscribe({
      next: (resp) => {
        this.album = resp;
        this.copies = this.album.copies!;
    }
    });
  }
}
