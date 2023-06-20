import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Album } from '../../interfaces/Album.interface';
import { AlbumService } from '../../services/album.service';
import { DataAlbumService } from '../../services/data-album.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { User } from 'src/app/user-management/interface/User.interface';
import { DataResourceService } from 'src/app/shared/services/data-resource.service';
import { Resource } from 'src/app/shared/interfaces/Resource.interface';


@Component({
  selector: 'shared-albums-table',
  templateUrl: './albums-table.component.html',
  styleUrls: ['./albums-table.component.css']
})
export class AlbumsTableComponent {
  @Input('title') title: string = '';
  @Input('albums') albums: Album[] = [];
  @Input('user') user!:User;

  @Output() onDeleteBook:EventEmitter<Album> = new EventEmitter<Album>();

  constructor (
    private albumService:AlbumService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    private dataAlbum:DataAlbumService,
    private dataResource:DataResourceService ) {}

  onDelete(album:Album){
    this.albumService.deleteAlbumById(album.id!).subscribe({
      error: (e) =>  {
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
        setTimeout (()=>{
          location.reload();
        },1000);
      },
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:`Álbum ${album.title} eliminado con éxito`})
    });
    this.albums = this.albums.filter ( a => a.id !== album.id);
  }

  confirmDelete(album:Album){
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quiere borrar este álbum?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.onDelete(album);
      },
      reject: (type:any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: `Cancelaste eliminar la pelicula ${album.title}` });
                  break;
          }
      }
    });

  }

  getDataMovie(album:Album):void{
      this.dataAlbum.album = album;
  }

  getDataResource (resource:Resource):void{
    this.dataResource.resource = resource;
}
}
