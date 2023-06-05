import { Injectable } from '@angular/core';
import { Book } from '../interfaces/Book.interface';

@Injectable({
  providedIn: 'root'
})
export class DataBookService {

  public book:Book ={
    title:'',
    writers:[{id:0,name:'',surnames:''}],
    publishedYear:0,
    isbn:'',
    pages:0,
    synopsis:'',
    publisher:{id:0,name:''},
    genre:{id:0,name:''},
    language:{id:0,name:''}
  };

  set setBook(book:Book){
    this.book = book;
  }

  get getBook(){
    return this.book;
  }

}
