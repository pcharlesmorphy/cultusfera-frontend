import { Component, DoCheck, EventEmitter, Output } from '@angular/core';
import { BookPublisher } from '../../interfaces/Book.interface';
import { BookPublisherService } from '../../services/book-publisher.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../../shared/services/validation.service';
import * as customPatterns from '../../../../shared/interfaces/ValidatorPatterns';

@Component({
  selector: 'app-new-book-publisher-page',
  templateUrl: './new-book-publisher-page.component.html',
  styleUrls: ['./new-book-publisher-page.component.css']
})
export class NewBookPublisherPageComponent implements DoCheck {
  public publisher!:BookPublisher;
  public newBookPublisherForm!: FormGroup;
  public title:string = '';
  public isEdit:boolean=false;
  public idBookPublisher:number=0;
  public hasErrors!:boolean;

  @Output() onCreateBookPublisher:EventEmitter<BookPublisher> = new EventEmitter<BookPublisher>();

  constructor (
    private fb:FormBuilder,
    private publisherService:BookPublisherService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private validationService:ValidationService) {

      this.hasErrors = false;

    }

  ngOnInit(): void {

    this.route.queryParams.subscribe (params => {
      this.idBookPublisher = params['id'];
      if (this.idBookPublisher !== undefined){
        this.isEdit = true;
      }
    })

    this.setTitle();

    this.newBookPublisherForm = this.fb.group ({
      name:['',[Validators.required,Validators.pattern(customPatterns.alphaPattern),Validators.maxLength(25)]],
    });

    if (this.isEdit){
      //Modo editar Escritor existente
       this.editBookPublisher(this.idBookPublisher);
    }
  }

  ngDoCheck(): void {
    if (!this.newBookPublisherForm.valid) this.hasErrors = true
    else this.hasErrors = false;
  }

  saveBookPublisher(){
      this.checkFormMessage();
      if (!this.hasErrors){
        this.formToBookPublisher();
        this.publisherService.addBookPublisher(this.publisher).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Editorial añadida con éxito'});
            this.onCreateBookPublisher.emit(this.publisher);
            this.newBookPublisherForm.reset();
          }
        });
    }
  }

  editBookPublisher(id:number){
      this.publisherService.getBookPublisherById(id).subscribe ({
      next: (value) =>{
        this.editMode(value);
        console.log(value);
      },
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:'Editorial cargada con éxito'})
    })
  }

  updateBookPublisher(){
    this.checkFormMessage();
    if (!this.hasErrors){
      this.formToBookPublisher();
      this.publisherService.updateBookPublisher(this.publisher).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Editorial actualizada con éxito'});
            this.newBookPublisherForm.reset();
        }
      });
  }
  }

  formToBookPublisher ():void{

    const publisherFormValues = this.newBookPublisherForm.value;

    this.publisher = {
      id:this.idBookPublisher,
      name:publisherFormValues.name,
    }

    console.log (this.publisher);
  }

  setTitle ():void{
    if (this.isEdit) this.title='Modificar Editorial';
    else this.title='Nueva Editorial'
  }

    resetForm ():void {
      this.newBookPublisherForm.reset();
    }

    editMode(publisher:BookPublisher):void {
      console.log(publisher);

      this.newBookPublisherForm.setValue({
      name:publisher.name,
    });
  }

  getFieldError (field:string):string|null{
    return this.validationService.getFieldError(field,this.newBookPublisherForm);
  }

  isValidField (field:string):boolean | null {
    return this.newBookPublisherForm.controls[field].errors && this.newBookPublisherForm.controls[field].touched;
  }

  checkFormMessage(){
    if (!this.newBookPublisherForm.valid){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
      return this.newBookPublisherForm.markAllAsTouched();


    }
  }
}
