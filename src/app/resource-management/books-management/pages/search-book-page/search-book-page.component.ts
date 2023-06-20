
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService, Message } from 'primeng/api';
import { BookService } from '../../services/book.service';
import { Book, Language, LiteraryGenre } from '../../interfaces/Book.interface';
import { User } from 'src/app/user-management/interface/User.interface';

@Component({
  selector: 'app-search-book-page',
  templateUrl: './search-book-page.component.html',
  styleUrls: [ './search-book-page.component.css'
  ]
})
export class SearchBookPageComponent implements OnInit{

  @Input('user') public user!:User;
  public searchBookForm!: FormGroup;
  public title:string = 'Buscar Libro';
  public books:Book[] = [];
  public dropdownList:any[]=[];
  public dropdownLabel:string='';
  public dropdownPlaceholder:string='';
  public isDropDownOptionSelected = false;
  public bookTitle:string='';
  public searchResult:boolean = false;
  public messageWithoutResults:Message[]=[];
  public searchCriteria: any[] = [
    { key:'title', value:'Por Título'},
    { key:'writer', value:'Por Escritor'},
    { key:'isbn', value:'Por ISBN'},
    { key:'genre',value:'Por Género'},
    { key:'language',value:'Por Idioma'}

  ];
  public selectedCriterion:any={};
  public searchText:string='';

  constructor (
    private fb:FormBuilder,
    private bookService:BookService,
    private messageService:MessageService) {}

    ngOnInit(): void {

      this.searchBookForm = this.fb.group ({
        searchKey:[this.searchCriteria[0]],
        searchText:[''],
        selectDropDown:['']
      });
      this.selectedCriterion = this.searchCriteria[0].clave;
      this.user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);
    }

   getBooksByTitle (bookTitle:string){
      this.bookService.getBooksByTitle(bookTitle).subscribe ({
        next: (resp:any) => {
           if (resp.length > 0) {
              this.searchResult=true;
              this.books = resp;
              console.log('Respuesta pelicula por titulo: ',resp);
           }
        }
     });
   }

   getBooksByWriter (nombre:string,apellidos:string) {

      this.bookService.getBooksByWriter(nombre,apellidos).subscribe ({
        next: (resp:any) => {
          if (resp.length > 0) {
             console.log(resp);
             this.searchResult=true;
             this.books = resp;
          }
       }
      });

   }

   getBooksByIsbn (isbn:string){
      this.bookService.getBooksByIsbn(isbn).subscribe ({
        next: (resp:any) => {
          if (resp.length > 0) {
            this.searchResult=true;
            this.books = resp;
         }
        }
      })
   }

   getBooksByGenre (id:number,name:string){
      this.bookService.getBooksByGenre(id,name).subscribe ({
        next: (resp:any) => {
          if (resp.length > 0) {
            this.searchResult=true;
            this.books = resp;
         }
        }
      })
   }

   getBooksByLanguage (id:number,name:string){
    this.bookService.getBooksByLanguage(id,name).subscribe ({
      next: (resp:any) => {
        if (resp.length > 0) {
          this.searchResult=true;
          this.books = resp;
       }
      }
    })
 }


   getLiteraryGenres(){
     this.dropdownList = this.bookService.getGenres;
     this.dropdownLabel = 'Escoge un género';
     this.dropdownPlaceholder = 'Selecciona un género';
   }

   getLanguages(){
     this.dropdownList = this.bookService.getLanguages;
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
      this.selectedCriterion = this.searchBookForm.get('searchKey')?.value;

      if (this.selectedCriterion.key === 'genre'){
        this.getLiteraryGenres();
        this.isDropDownOptionSelected=true;
      }else if (this.selectedCriterion.key === 'language'){
        this.getLanguages();
        this.isDropDownOptionSelected=true;
      } else {
        this.isDropDownOptionSelected=false;
      }

    }

    onSearch():void{
      this.searchResult=false;
      this.selectedCriterion = this.searchBookForm.get('searchKey')?.value;

      switch (this.selectedCriterion.key){
        case 'title':
          let bookTitle:string = this.searchBookForm.get('searchText')?.value;
          this.getBooksByTitle(bookTitle);
          if (!this.searchResult){
              this.messageWithoutResults = this.negativeMessage(bookTitle);
          }
          break;
         case 'writer':
          const { name,surnames } = this.buildWriter();
          this.getBooksByWriter(name,surnames);
          if (!this.searchResult){
            const writerString = `${name} ${surnames}`;
            this.messageWithoutResults = this.negativeMessage(writerString);
          }
          break;
         case 'isbn':
          let isbn:string = this.searchBookForm.get('searchText')?.value;
          this.getBooksByIsbn(isbn);
          if (!this.searchResult){
            this.messageWithoutResults = this.negativeMessage(isbn);
          }
          break;
         case 'genre':
           let genre:LiteraryGenre=this.searchBookForm.get('selectDropDown')?.value;
           console.log(genre);
           this.getBooksByGenre(genre.id,genre.name);
           if (!this.searchResult){
            this.messageWithoutResults = this.negativeMessage(genre.name);
          }
          break;
          case 'language':
            let language:Language=this.searchBookForm.get('selectDropDown')?.value;
            console.log(language);
            this.getBooksByLanguage(language.id,language.name);
            if (!this.searchResult){
              this.messageWithoutResults = this.negativeMessage(language.name);
            }

      }
    }
      buildWriter ():any {

          this.searchText = this.searchBookForm.get('searchText')?.value;

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



