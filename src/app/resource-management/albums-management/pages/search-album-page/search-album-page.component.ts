import { Component, Input } from '@angular/core';
import { FormGroup , FormBuilder} from '@angular/forms';
import { Album, MusicGenre } from '../../interfaces/Album.interface';
import { Message, MessageService} from 'primeng/api';
import { AlbumService } from '../../services/album.service';
import { User } from 'src/app/user-management/interface/User.interface';

@Component({
  selector: 'app-search-album-page',
  templateUrl: './search-album-page.component.html',
  styleUrls: ['./search-album-page.component.css']
})
export class SearchAlbumPageComponent {
  @Input('user') public user!:User
  public searchAlbumForm!: FormGroup;
  public title:string = 'Buscar Álbum';
  public albums:Album[] = [];
  public genres:MusicGenre[]=[];
  public isDropDownOptionSelected = false;
  public albumTitle:string='';
  public searchResult:boolean = false;
  public messageWithoutResults:Message[]=[];
  public searchCriteria: any[] = [
    { key:'title', value:'Por Título'},
    { key:'musician', value:'Por Músico'},
    { key:'genre',value:'Por Género'},
  ];
  public selectedCriterion:any={};
  public searchText:string='';

  constructor (
    private fb:FormBuilder,
    private albumService:AlbumService,
    private messageService:MessageService) {}

    ngOnInit(): void {

      this.searchAlbumForm = this.fb.group ({
        searchKey:[this.searchCriteria[0]],
        searchText:[''],
        selectGenre:['']
      });
      this.selectedCriterion = this.searchCriteria[0].clave;
      this.genres = this.albumService.getGenres;
      this.user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);
    }

   getAlbumsByTitle (albumTitle:string){
      this.albumService.getAlbumsByTitle(albumTitle).subscribe ({
        next: (resp:any) => {
           if (resp.length > 0) {
              this.searchResult=true;
              this.albums = resp;
              console.log('Respuesta pelicula por titulo: ',resp);
           }
        }
     });
   }

   getAlbumsByMusician (nombre:string,apellidos:string) {

      this.albumService.getAlbumsByMusician(nombre,apellidos).subscribe ({
        next: (resp:any) => {
          if (resp.length > 0) {
             this.searchResult=true;
             this.albums = resp;
          }
       }
      });

   }


   getAlbumsByGenre (id:number,name:string){
    this.albumService.getAlbumsByGenre(id,name).subscribe ({
      next: (resp:any) => {
        if (resp.length > 0) {
          this.searchResult=true;
          this.albums = resp;
       }
      }
    })
 }



   negativeMessage(criterion:string):Message[] { return [
      { severity: 'info',
        summary: 'Info',
        detail: `La búsqueda con el criterio:  ${criterion.toLocaleUpperCase()}
        no arroja ningún resultado.`
      } ];
    }


    changeSelectedCriterion(){
      this.selectedCriterion = this.searchAlbumForm.get('searchKey')?.value;

      if (this.selectedCriterion.key === 'genre'){
        this.isDropDownOptionSelected=true;

      }else {
        this.isDropDownOptionSelected=false;
      }
    }


    onSearch():void{
      this.searchResult=false;
      this.selectedCriterion = this.searchAlbumForm.get('searchKey')?.value;

      switch (this.selectedCriterion.key){
        case 'title':
          let bookTitle:string = this.searchAlbumForm.get('searchText')?.value;
          this.getAlbumsByTitle(bookTitle);
          if (!this.searchResult){
              this.messageWithoutResults = this.negativeMessage(bookTitle);
          }
          break;
         case 'musician':
          const { name,surnames } = this.buildMusician();
          this.getAlbumsByMusician(name,surnames);
          if (!this.searchResult){
            const writerString = `${name} ${surnames}`;
            this.messageWithoutResults = this.negativeMessage(writerString);
          }
          break;

          case 'genre':
           let genre:MusicGenre=this.searchAlbumForm.get('selectGenre')?.value;
           this.getAlbumsByGenre(genre.id,genre.name);
           if (!this.searchResult){
            this.messageWithoutResults = this.negativeMessage(genre.name);
          }
          break;

      }
    }
      buildMusician ():any {

        this.searchText = this.searchAlbumForm.get('searchText')?.value;
        const textWords = this.searchText.split(' ');
        const numberWords = textWords.length;

        if (numberWords === 1){
          return {name:textWords[0],surnames:''};
        }

        const name = textWords.shift();
        const surnames = textWords.join(" ");
        return {name,surnames}
      }
}
