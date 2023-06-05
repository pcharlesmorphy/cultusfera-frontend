import { Component, DoCheck, OnInit } from '@angular/core';
import { Magazine, MagazineSubject, MagazinePublisher, Month } from '../../interfaces/Magazine.interface';
import { Language } from 'src/app/resource-management/books-management/interfaces/Book.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MagazineService } from '../../services/magazine.service';
import * as customPatterns from '../../../../shared/interfaces/ValidatorPatterns';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'app-new-magazine-page',
  templateUrl: './new-magazine-page.component.html',
  styleUrls: ['./new-magazine-page.component.css']
})
export class NewMagazinePageComponent implements OnInit,DoCheck{
  public magazine!: Magazine;
  public subjects!: MagazineSubject[];
  public publishers!: MagazinePublisher[];
  public languages!:Language[];
  public months!:Month[];
  public newMagazineForm!: FormGroup;
  public title:string = '';
  public isEdit:boolean=false;
  public idMagazine:number=0;
  public isVisiblePublisherModal:boolean=false;
  public hasErrors!:boolean;

  constructor (
    private fb:FormBuilder,
    private magazineService:MagazineService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private validationService:ValidationService) {}


  ngOnInit(): void {

    this.hasErrors=false;

    this.route.queryParams.subscribe (params => {
      this.idMagazine = params['id'];
      if (this.idMagazine !== undefined){
        this.isEdit = true;
      }
    })

    this.setTitle();
    this.subjects = this.magazineService.getSubjects;
    this.getPublishers();

    this.languages = this.magazineService.getLanguages;
    this.months = this.magazineService.getMonths;

    this.newMagazineForm = this.fb.group ({
      title:['',[Validators.required,Validators.maxLength(45),Validators.pattern(customPatterns.alphaPattern)]],
      subject:['',[Validators.required]],
      publisher:['',[Validators.required]],
      numMag:[null,[Validators.required,Validators.min(1)]],
      month:[null,[Validators.required]],
      pages:[null,[Validators.required,Validators.min(1)]],
      language:['',[Validators.required]],
      pubYear:[null,[Validators.required]],
    });

    if (this.isEdit){
      //Modo editar Libro existente
       this.editMagazine(this.idMagazine);
    }
  }

  ngDoCheck(): void {
    if (!this.newMagazineForm.valid) this.hasErrors = true
    else this.hasErrors = false;
  }

  saveMagazine(){
      this.checkFormMessage();
      if(!this.hasErrors){
        this.formToMagazine();
        this.magazineService.addMagazine(this.magazine).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Revista añadida con éxito'});
            this.newMagazineForm.reset();
          }
        });
    }
  }

  editMagazine(id:number){
      this.magazineService.getMagazineById(id).subscribe ({
      next: (value) =>{
        console.log('Revista para editar: ', value);
        this.editMode(value);
      },
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:'Revista cargada con éxito'})
    })
  }

  updateMagazine(){
    this.checkFormMessage();
    if(!this.hasErrors){
      this.formToMagazine();
      this.magazineService.updateMagazine(this.magazine).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Revista actualizada con éxito'});
            this.newMagazineForm.reset();
        }
      });
    }
  }

  onCreateMagazinePublisherHandler(publisher:MagazinePublisher){
      this.getPublishers();
  }

  showPublisherModal(){
    this.isVisiblePublisherModal = true;
  }

  getPublishers(){
    this.magazineService.getPublishers().subscribe ( (publishers) => {
      this.publishers = publishers;
      console.log(publishers);
    });
  }

  formToMagazine ():void{

    const magazineFormValues = this.newMagazineForm.value;
    let publishedYear = new Date(magazineFormValues.pubYear);
    let magazineMonth = new Date(magazineFormValues.month);

    this.magazine = {
      id:this.idMagazine,
      title:magazineFormValues.title,
      subject:magazineFormValues.subject,
      numberMagazine:magazineFormValues.numMag,
      month: magazineFormValues.month,
      publisher:magazineFormValues.publisher,
      pages:magazineFormValues.pages,
      language:magazineFormValues.language,
      publishedYear: publishedYear.getFullYear(),
    }
  }

  setTitle ():void{
    if (this.isEdit) this.title='Modificar Revista';
    else this.title='Nueva Revista'
  }



    resetForm ():void {
      this.newMagazineForm.reset();
    }

    editMode(magazine:Magazine):void {
      console.log(magazine);

      let yearDatePicker:Date = new Date(magazine.publishedYear,0,1);

      this.newMagazineForm.setValue({
      title:magazine.title,
      month: magazine.month,
      numMag: magazine.numberMagazine,
      subject:magazine.subject,
      publisher:magazine.publisher,
      pages:magazine.pages,
      language:magazine.language,
      pubYear:yearDatePicker,

    });
  }

  getFieldError (field:string):string|null{
    return this.validationService.getFieldError(field,this.newMagazineForm);
  }

  isValidField (field:string):boolean | null {
    return this.newMagazineForm.controls[field].errors && this.newMagazineForm.controls[field].touched;
  }

  checkFormMessage(){
    if (!this.newMagazineForm.valid){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
      return this.newMagazineForm.markAllAsTouched();

    }
  }
}
