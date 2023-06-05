import { Language } from './../../../books-management/interfaces/Book.interface';
import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Movie, MovieGenre } from '../../interfaces/Movie.interface';
import { Message, MessageService } from 'primeng/api';
import { MovieService } from '../../services/movie.service';
import { User } from 'src/app/user-management/interface/User.interface';

@Component({
  selector: 'app-search-movie-page',
  templateUrl: './search-movie-page.component.html',
  styleUrls: ['./search-movie-page.component.css']
})

export class SearchMoviePageComponent {

  @Input('user') public user!:User
  public searchMovieForm!: FormGroup;
  public title:string = 'Buscar Película';
  public movies:Movie[] = [];
  public dropdownList:any[]=[];
  public dropdownLabel:string='';
  public dropdownPlaceholder:string='';
  public isDropDownOptionSelected = false;
  public movieTitle:string='';
  public searchResult:boolean = false;
  public messageWithoutResults:Message[]=[];
  public searchCriteria: any[] = [
    { key:'title', value:'Por Título'},
    { key:'director', value:'Por Director'},
    { key:'actor', value:'Por Actor'},
    { key:'genre',value:'Por Género'},
    { key:'language',value:'Por Idioma'}
  ];
  public selectedCriterion:any={};
  public searchText:string='';

  constructor (
    private fb:FormBuilder,
    private movieService:MovieService,
    private messageService:MessageService) {}

    ngOnInit(): void {

      this.searchMovieForm = this.fb.group ({
        searchKey:[this.searchCriteria[0]],
        searchText:[''],
        selectDropDown:['']
      });
      this.selectedCriterion = this.searchCriteria[0].clave;
      this.user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);
    }

   getMoviesByTitle (bookTitle:string){
      this.movieService.getMoviesByTitle(bookTitle).subscribe ({
        next: (resp:any) => {
           if (resp.length > 0) {
              this.searchResult=true;
              this.movies = resp;
              console.log('Respuesta pelicula por titulo: ',resp);
           }
        }
     });
   }

   getMoviesByDirector (nombre:string,apellidos:string) {

      this.movieService.getMoviesByDirector(nombre,apellidos).subscribe ({
        next: (resp:any) => {
          if (resp.length > 0) {
             console.log(resp);
             this.searchResult=true;
             this.movies = resp;
          }
       }
      });

   }

   getMoviesByActor (nombre:string, apellidos:string) {

      this.movieService.getMoviesByActor(nombre,apellidos).subscribe ({
        next: (resp:any) => {
          if (resp.length > 0) {
            console.log(resp);
            this.searchResult=true;
            this.movies = resp;
          }
        }
      });
   }

   getBooksByGenre (id:number,name:string){
    this.movieService.getMoviesByGenre(id,name).subscribe ({
      next: (resp:any) => {
        if (resp.length > 0) {
          this.searchResult=true;
          this.movies = resp;
       }
      }
    })
 }

 getBooksByLanguage (id:number,name:string){
  this.movieService.getMoviesByLanguage(id,name).subscribe ({
    next: (resp:any) => {
      if (resp.length > 0) {
        this.searchResult=true;
        this.movies = resp;
      }
      }
    })
  }

  getMovieGenres(){
    this.dropdownList = this.movieService.getGenres;
    this.dropdownLabel = 'Escoge un género';
    this.dropdownPlaceholder = 'Selecciona un género';
  }

  getLanguages(){
    this.dropdownList = this.movieService.getLanguages;
    this.dropdownLabel = 'Escoge un idioma';
    this.dropdownPlaceholder = 'Selecciona un idioma'
  }

   negativeMessage(criterion:string):Message[] { return [
      { severity: 'info',
        summary: 'Info',
        detail: `La búsqueda con el criterio:  ${criterion.toLocaleUpperCase()}
        no arroja ningún resultado.`
      } ];
    }

    changeSelectedCriterion(){
      this.selectedCriterion = this.searchMovieForm.get('searchKey')?.value;

      if (this.selectedCriterion.key === 'genre'){
        this.getMovieGenres();
        this.isDropDownOptionSelected=true;
        console.log('SelectedCriterios is genre');
      }else if (this.selectedCriterion.key === 'language'){
        this.getLanguages();
        this.isDropDownOptionSelected=true;
      } else {
        this.isDropDownOptionSelected=false;
      }

    }


    onSearch():void{
      this.searchResult=false;
      this.selectedCriterion = this.searchMovieForm.get('searchKey')?.value;

      switch (this.selectedCriterion.key){
        case 'title':
          let bookTitle:string = this.searchMovieForm.get('searchText')?.value;
          this.getMoviesByTitle(bookTitle);
          if (!this.searchResult){
              this.messageWithoutResults = this.negativeMessage(bookTitle);
          }
          break;
         case 'director':
          const { name,surnames } = this.buildDirector();
          this.getMoviesByDirector(name,surnames);
          if (!this.searchResult){
            const writerString = `${name} ${surnames}`;
            this.messageWithoutResults = this.negativeMessage(writerString);
          }
          break;
         case 'actores':
          let isbn:string = this.searchMovieForm.get('searchText')?.value;
          this.getMoviesByActor(name,surnames);
          if (!this.searchResult){
            this.messageWithoutResults = this.negativeMessage(isbn);
          }
          break;
          case 'genre':
           let genre:MovieGenre=this.searchMovieForm.get('selectDropDown')?.value;
           console.log(genre);
           this.getBooksByGenre(genre.id,genre.name);
           if (!this.searchResult){
            this.messageWithoutResults = this.negativeMessage(genre.name);
          }
          break;
          case 'language':
            let language:Language=this.searchMovieForm.get('selectDropDown')?.value;
            console.log(language);
            this.getBooksByLanguage(language.id,language.name);
            if (!this.searchResult){
              this.messageWithoutResults = this.negativeMessage(language.name);
            }
      }
    }
      buildDirector ():any {

        this.searchText = this.searchMovieForm.get('searchText')?.value;

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
