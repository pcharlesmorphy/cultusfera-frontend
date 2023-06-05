import { Injectable } from '@angular/core';
import { Magazine } from '../interfaces/Magazine.interface';

@Injectable({
  providedIn: 'root'
})
export class DataMagazineService {

  public magazine:Magazine ={
    title:'',
    publishedYear:0,
    month:{id:0,name:''},
    numberMagazine:0,
    pages:0,
    publisher:{id:0,name:''},
    subject:{id:0,name:''},
    language:{id:0,name:''}
  };

  set setMagazine(magazine:Magazine){
    this.magazine = magazine;
  }

  get getMagazine(){
    return this.magazine;
  }
}
