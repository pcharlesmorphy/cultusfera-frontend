import { Component, Output, EventEmitter, DoCheck } from '@angular/core';
import { Director } from '../../interfaces/Movie.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DirectorService } from '../../services/director.service';
import { MessageService } from 'primeng/api';
import * as customPatterns from '../../../../shared/interfaces/ValidatorPatterns';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'app-new-director-page',
  templateUrl: './new-director-page.component.html',
  styleUrls: ['./new-director-page.component.css']
})
export class NewDirectorPageComponent implements DoCheck {
  public director!:Director;
  public newDirectorForm!: FormGroup;
  public title:string = '';
  public isEdit:boolean=false;
  public idDirector:number=0;
  public hasErrors!:boolean;

  @Output() onCreateDirector:EventEmitter<Director> = new EventEmitter<Director>();

  constructor (
    private fb:FormBuilder,
    private writerService:DirectorService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private validationService:ValidationService) {

      this.hasErrors = false;
    }


  ngOnInit(): void {

    this.route.queryParams.subscribe (params => {
      this.idDirector = params['id'];
      if (this.idDirector !== undefined){
        this.isEdit = true;
      }
    })

    this.setTitle();

    this.newDirectorForm = this.fb.group ({
      name:['',[Validators.required,Validators.maxLength(45),Validators.pattern(customPatterns.namesPattern)]],
      surnames:['',[Validators.required,Validators.maxLength(45),Validators.pattern(customPatterns.namesPattern)]],
    });

    if (this.isEdit){
      //Modo editar Escritor existente
       this.editDirector(this.idDirector);
    }
  }


  ngDoCheck(): void {
    if (!this.newDirectorForm.valid) this.hasErrors = true
    else this.hasErrors = false;
  }

  saveDirector(){
      this.checkFormMessage();
      if (!this.hasErrors){
        this.formToDirector();
        this.writerService.addDirector(this.director).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Director añadido con éxito'});
            this.onCreateDirector.emit(this.director);
            this.newDirectorForm.reset();
          }
        });
    }
  }

  editDirector(id:number){
      this.writerService.getDirectorById(id).subscribe ({
      next: (value) =>{
        this.editMode(value);
        console.log(value);
      },
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:'Director cargado con éxito'})
    })
  }

  updateDirector(){
    this.checkFormMessage();
    if (!this.hasErrors){
      this.formToDirector();
      this.writerService.updateDirector(this.director).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Director actualizado con éxito'});
            this.newDirectorForm.reset();
        }
      });
    }
  }

  formToDirector ():void{

    const writerFormValues = this.newDirectorForm.value;

    this.director = {
      id:this.idDirector,
      name:writerFormValues.name,
      surnames:writerFormValues.surnames,
    }

    console.log (this.director);
  }

  setTitle ():void{
    if (this.isEdit) this.title='Modificar Director';
    else this.title='Nuevo Director'
  }

    resetForm ():void {
      this.newDirectorForm.reset();
    }

    editMode(director:Director):void {
      console.log(director);

      this.newDirectorForm.setValue({
      name:director.name,
      surnames:director.surnames,
    });
  }

  getFieldError (field:string):string|null{
    return this.validationService.getFieldError(field,this.newDirectorForm);
  }

  isValidField (field:string):boolean | null {
    return this.newDirectorForm.controls[field].errors && this.newDirectorForm.controls[field].touched;
  }

  checkFormMessage(){
    if (!this.newDirectorForm.valid){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
      return this.newDirectorForm.markAllAsTouched();

    }
  }
}



