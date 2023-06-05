import { Component, DoCheck, EventEmitter, Output } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { RecordCompany } from '../../interfaces/Album.interface';
import { RecordCompanyService } from '../../services/record-company.service';
import * as customPatterns from '../../../../shared/interfaces/ValidatorPatterns';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'app-new-record-company-page',
  templateUrl: './new-record-company-page.component.html',
  styleUrls: ['./new-record-company-page.component.css']
})
export class NewRecordCompanyPageComponent implements DoCheck{

  public recordCompany!:RecordCompany;
  public newRecordCompanyForm!: FormGroup;
  public title:string = '';
  public isEdit:boolean=false;
  public idRecordCompany:number=0;
  public hasErrors!:boolean;

  @Output() onCreateRecordCompany:EventEmitter<RecordCompany> = new EventEmitter<RecordCompany>();

  constructor (
    private fb:FormBuilder,
    private publisherService:RecordCompanyService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private validationService:ValidationService) {

      this.hasErrors = false;
    }


  ngOnInit(): void {

    this.route.queryParams.subscribe (params => {
      this.idRecordCompany = params['id'];
      if (this.idRecordCompany !== undefined){
        this.isEdit = true;
      }
    })

    this.setTitle();

    this.newRecordCompanyForm = this.fb.group ({
      name:['',[Validators.required,Validators.pattern(customPatterns.alphaPattern),Validators.maxLength(25)]],
    });

    if (this.isEdit){
      //Modo editar Escritor existente
       this.editRecordCompany(this.idRecordCompany);
    }
  }

  ngDoCheck(): void {
    if (!this.newRecordCompanyForm.valid) this.hasErrors = true
    else this.hasErrors = false;
  }

  saveRecordCompany(){
    this.checkFormMessage();
    if(!this.hasErrors){
        this.formToRecordCompany();
        this.publisherService.addRecordCompany(this.recordCompany).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Editorial añadida con éxito'});
            this.onCreateRecordCompany.emit(this.recordCompany);
            this.newRecordCompanyForm.reset();
          }
        });
    }
  }

  editRecordCompany(id:number){
      this.publisherService.getRecordCompanyById(id).subscribe ({
      next: (value) =>{
        this.editMode(value);
        console.log(value);
      },
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:'Editorial cargada con éxito'})
    })
  }

  updateRecordCompany(){
    this.checkFormMessage();
    if (!this.hasErrors){
      this.formToRecordCompany();
      this.publisherService.updateRecordCompany(this.recordCompany).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Editorial actualizada con éxito'});
            this.newRecordCompanyForm.reset();
        }
      });
    }
  }

  formToRecordCompany ():void{

    const publisherFormValues = this.newRecordCompanyForm.value;

    this.recordCompany = {
      id:this.idRecordCompany,
      name:publisherFormValues.name,
    }

  }

  setTitle ():void{
    if (this.isEdit) this.title='Modificar Discográfica';
    else this.title='Nueva Discográfica'
  }

    resetForm ():void {
      this.newRecordCompanyForm.reset();
    }

    editMode(recordCompany:RecordCompany):void {

      this.newRecordCompanyForm.setValue({
      name:recordCompany.name,
    });
  }

  getFieldError (field:string):string|null{
    return this.validationService.getFieldError(field,this.newRecordCompanyForm);
  }

  isValidField (field:string):boolean | null {
    return this.newRecordCompanyForm.controls[field].errors && this.newRecordCompanyForm.controls[field].touched;
  }

  checkFormMessage(){
    if (!this.newRecordCompanyForm.valid){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
      return this.newRecordCompanyForm.markAllAsTouched();

    }
  }
}
