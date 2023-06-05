import { Injectable } from '@angular/core';
import { Album } from '../interfaces/Album.interface';

@Injectable({
  providedIn: 'root'
})
export class DataAlbumService {

  public album:Album ={
    title:'',
    musician:{id:0,name:'',surnames:''},
    publishedYear:0,
    duration:0,
    recordCompany:{id:0,name:''},
    genre:{id:0,name:''},
  };

  set setAlbum(album:Album){
    this.album = album;
  }

  get getAlbum(){
    return this.album;
  }
}
