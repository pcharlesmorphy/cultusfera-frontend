import { Component } from '@angular/core';
import { Album } from '../../interfaces/Album.interface';
import { AlbumService } from '../../services/album.service';
import { SimpleChanges } from '@angular/core';
import { User } from 'src/app/user-management/interface/User.interface';

@Component({
  selector: 'app-listing-albums-page',
  templateUrl: './listing-albums-page.component.html',
  styleUrls: ['./listing-albums-page.component.css']
})
export class ListingAlbumsPageComponent {
  public title:string = 'Listar Albumes';
  public albums:Album[] = [];
  public user!:User;

  constructor (
    private albumService:AlbumService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getAlbums();
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('loggedInUser')!);
    this.getAlbums();
  }

  getAlbums():void{
    this.albumService.getAlbums().subscribe ({
      next: (resp) => {
         this.albums = resp;
         console.log("Album para listar",resp);
      }
   });
  }
}
