import { Component,Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { Writer } from '../../interfaces/Book.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WriterService } from '../../services/writer.service';
import { MessageService } from 'primeng/api';
import { ValidationService } from '../../../../shared/services/validation.service';
import * as customPatterns from '../../../../shared/interfaces/ValidatorPatterns';

@Component({
  selector: 'app-new-writer-page',
  templateUrl: './new-writer-page.component.html',
  styleUrls: ['./new-writer-page.component.css']
})
export class NewWriterPageComponent implements DoCheck{

  public writer!:Writer;
  public newWriterForm!: FormGroup;
  public title:string = '';
  public isEdit:boolean=false;
  public idWriter:number=0;
  public hasErrors!:boolean;

  @Output() onCreateWriter:EventEmitter<Writer> = new EventEmitter<Writer>();

  constructor (
    private fb:FormBuilder,
    private writerService:WriterService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private validationService:ValidationService) {

      this.hasErrors=false;
    }




  ngOnInit(): void {


    this.route.queryParams.subscribe (params => {
      this.idWriter = params['id'];
      if (this.idWriter !== undefined){
        this.isEdit = true;
      }
    })

    this.setTitle();

    this.newWriterForm = this.fb.group ({
      name:['',[Validators.required,Validators.maxLength(45),Validators.pattern(customPatterns.namesPattern)]],
      surnames:['',[Validators.required,Validators.maxLength(45),Validators.pattern(customPatterns.namesPattern)]],
    });

    if (this.isEdit){
      //Modo editar Escritor existente
       this.editWriter(this.idWriter);
    }
  }

  ngDoCheck(): void {
    if (!this.newWriterForm.valid) this.hasErrors = true
    else this.hasErrors = false;
  }

  saveWriter(){
      this.checkFormMessage();
      if (!this.hasErrors){
        console.log("No hay errores");
        this.formToWriter();
        this.writerService.addWriter(this.writer).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Escritor añadido con éxito'});
            this.onCreateWriter.emit(this.writer);
            this.newWriterForm.reset();
          }
        });
      }
  }

  editWriter(id:number){
      this.writerService.getWriterById(id).subscribe ({
      next: (value) =>{
        this.editMode(value);
        console.log(value);
      },
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:'Escritor cargado con éxito'})
    })
  }

  updateWriter(){
    this.checkFormMessage();
    if (!this.hasErrors){
      this.formToWriter();
      this.writerService.updateWriter(this.writer).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Escritor actualizado con éxito'});
            this.newWriterForm.reset();
        }
      });
    }
  }

  formToWriter ():void{

    const writerFormValues = this.newWriterForm.value;

    this.writer = {
      id:this.idWriter,
      name:writerFormValues.name,
      surnames:writerFormValues.surnames,
    }

    console.log (this.writer);
  }

  setTitle ():void{
    if (this.isEdit) this.title='Modificar Autor';
    else this.title='Nuevo Autor'
  }

    resetForm ():void {
      this.newWriterForm.reset();
    }

    editMode(writer:Writer):void {
      console.log(writer);

      this.newWriterForm.setValue({
      name:writer.name,
      surnames:writer.surnames,
    });
  }

  getFieldError (field:string):string|null{
    return this.validationService.getFieldError(field,this.newWriterForm);
  }

  isValidField (field:string):boolean | null {
    return this.newWriterForm.controls[field].errors && this.newWriterForm.controls[field].touched;
  }

  checkFormMessage(){
    if (!this.newWriterForm.valid){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
      return this.newWriterForm.markAllAsTouched();

    }
  }

}
