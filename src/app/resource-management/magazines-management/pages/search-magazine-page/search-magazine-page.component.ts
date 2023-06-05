import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Magazine, MagazineSubject } from '../../interfaces/Magazine.interface';
import { Language } from 'src/app/resource-management/books-management/interfaces/Book.interface';
import { Message, MessageService } from 'primeng/api';
import { MagazineService } from '../../services/magazine.service';
import { User } from 'src/app/user-management/interface/User.interface';

@Component({
  selector: 'app-search-magazine-page',
  templateUrl: './search-magazine-page.component.html',
  styleUrls: ['./search-magazine-page.component.css']
})
export class SearchMagazinePageComponent {
  @Input('user') public user!:User;
  public searchMagazineForm!: FormGroup;
  public title:string = 'Buscar Revista';
  public magazines:Magazine[] = [];
  public dropdownList:any[]=[];
  public dropdownLabel:string='';
  public dropdownPlaceholder:string='';
  public isDropDownOptionSelected = false;
  public magazineTitle:string='';
  public searchResult:boolean = false;
  public messageWithoutResults:Message[]=[];
  public searchCriteria: any[] = [
    { key:'title', value:'Por Título'},
    { key:'subject',value:'Por Tema'},
    { key:'language',value:'Por Idioma'}
  ];

  public selectedCriterion:any={};
  public searchText:string='';

  constructor (
    private fb:FormBuilder,
    private magazineService:MagazineService,
    private messageService:MessageService) {}

    ngOnInit(): void {

      this.searchMagazineForm = this.fb.group ({
        searchKey:[this.searchCriteria[0]],
        searchText:[''],
        selectDropDown:['']
      });
      this.selectedCriterion = this.searchCriteria[0].clave;
      this.user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);
    }

   getMagazinesByTitle (magazineTitle:string){
      this.magazineService.getMagazinesByTitle(magazineTitle).subscribe ({
        next: (resp:any) => {
           if (resp.length > 0) {
              this.searchResult=true;
              this.magazines = resp;
           }
        }
     });
   }


   getMagazinesBySubject (id:number,name:string){
      this.magazineService.getMagazinesBySubject(id,name).subscribe ({
        next: (resp:any) => {
          if (resp.length > 0) {
            this.searchResult=true;
            this.magazines = resp;
         }
        }
      })
   }

   getMagazinesByLanguage (id:number,name:string){
    this.magazineService.getMagazinesByLanguage(id,name).subscribe ({
      next: (resp:any) => {
        if (resp.length > 0) {
          this.searchResult=true;
          this.magazines = resp;
       }
      }
    })
 }


   getMagazineSubjects(){
     this.dropdownList = this.magazineService.getSubjects;
     this.dropdownLabel = 'Escoge un tema';
     this.dropdownPlaceholder = 'Selecciona un tema';
   }

   getLanguages(){
     this.dropdownList = this.magazineService.getLanguages;
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
      this.selectedCriterion = this.searchMagazineForm.get('searchKey')?.value;

      if (this.selectedCriterion.key === 'subject'){
        this.getMagazineSubjects();
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
      this.selectedCriterion = this.searchMagazineForm.get('searchKey')?.value;

      switch (this.selectedCriterion.key){
        case 'title':
          let magazineTitle:string = this.searchMagazineForm.get('searchText')?.value;
          this.getMagazinesByTitle(magazineTitle);
          if (!this.searchResult){
              this.messageWithoutResults = this.negativeMessage(magazineTitle);
          }
          break;
         case 'subject':
           let genre:MagazineSubject=this.searchMagazineForm.get('selectDropDown')?.value;
           console.log(genre);
           this.getMagazinesBySubject(genre.id,genre.name);
           if (!this.searchResult){
            this.messageWithoutResults = this.negativeMessage(genre.name);
          }
          break;
          case 'language':
            let language:Language=this.searchMagazineForm.get('selectDropDown')?.value;
            console.log(language);
            this.getMagazinesByLanguage(language.id,language.name);
            if (!this.searchResult){
              this.messageWithoutResults = this.negativeMessage(language.name);
            }

      }
    }
      buildWriter ():any {

          this.searchText = this.searchMagazineForm.get('searchText')?.value;

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
