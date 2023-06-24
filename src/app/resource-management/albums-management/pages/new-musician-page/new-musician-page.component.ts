import { Component, Output, EventEmitter, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Musician } from '../../interfaces/Album.interface';
import { MusicianService } from '../../services/musician.service';
import * as customPatterns from '../../../../shared/interfaces/ValidatorPatterns';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'app-new-musician-page',
  templateUrl: './new-musician-page.component.html',
  styleUrls: ['./new-musician-page.component.css']
})
export class NewMusicianPageComponent implements DoCheck {

  public musician!:Musician;
  public newMusicianForm!: FormGroup;
  public title:string = '';
  public isEdit:boolean=false;
  public idMusician:number=0;
  public hasErrors!:boolean;

  @Output() onCreateMusician:EventEmitter<Musician> = new EventEmitter<Musician>();

  constructor (
    private fb:FormBuilder,
    private musicianService:MusicianService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private validationService:ValidationService) {

      this.hasErrors = false;
    }


  ngOnInit(): void {

    this.route.queryParams.subscribe (params => {
      this.idMusician = params['idMusico'];
      if (this.idMusician !== undefined){
        this.isEdit = true;
      }
    })

    this.setTitle();

    this.newMusicianForm = this.fb.group ({
      name:['',[Validators.required,Validators.maxLength(45),Validators.pattern(customPatterns.namesPattern)]],
      surnames:[''],
    });

    if (this.isEdit){
      //Modo editar Escritor existente
       this.editMusician(this.idMusician);
    }
  }

  ngDoCheck(): void {
    if (!this.newMusicianForm.valid) this.hasErrors = true
    else this.hasErrors = false;
  }

  saveMusician(){
    this.checkFormMessage();
    if (!this.hasErrors){
        this.formToMusician();
        this.musicianService.addMusician(this.musician).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Músico añadido con éxito'});
            this.onCreateMusician.emit(this.musician);
            this.newMusicianForm.reset();
          }
        });
    }
  }

  editMusician(id:number){
      this.musicianService.getMusicianById(id).subscribe ({
      next: (value) =>{
        this.editMode(value);
        console.log(value);
      },
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:'Músico cargado con éxito'})
    })
  }

  updateMusician(){
    this.checkFormMessage();
    if (!this.hasErrors){
      this.formToMusician();
      this.musicianService.updateMusician(this.musician).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Músico actualizado con éxito'});
            this.newMusicianForm.reset();
        }
      });
    }
  }

  formToMusician ():void{

    let writerFormValues = this.newMusicianForm.value;
    if (writerFormValues.surnames === null) writerFormValues.surnames = '';
    this.musician = {
      id:this.idMusician,
      name:writerFormValues.name,
      surnames:writerFormValues.surnames,
    }

    console.log (this.musician);
  }

  setTitle ():void{
    if (this.isEdit) this.title='Modificar Músico';
    else this.title='Nuevo Músico'
  }

    resetForm ():void {
      this.newMusicianForm.reset();
    }

    editMode(musician:Musician):void {

      this.newMusicianForm.setValue({
      name:musician.name,
      surnames:musician.surnames,
    });
  }

  getFieldError (field:string):string|null{
    return this.validationService.getFieldError(field,this.newMusicianForm);
  }

  isValidField (field:string):boolean | null {
    return this.newMusicianForm.controls[field].errors && this.newMusicianForm.controls[field].touched;
  }

  checkFormMessage(){
    if (!this.newMusicianForm.valid){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
      return this.newMusicianForm.markAllAsTouched();

    }
  }

}
