import { Component, Output, EventEmitter, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Actor } from '../../interfaces/Movie.interface';
import { ActorService } from '../../services/actor.service';
import * as customPatterns from '../../../../shared/interfaces/ValidatorPatterns';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'app-new-actor-page',
  templateUrl: './new-actor-page.component.html',
  styleUrls: ['./new-actor-page.component.css']
})
export class NewActorPageComponent implements DoCheck {

  public actor!:Actor;
  public newActorForm!: FormGroup;
  public title:string = '';
  public isEdit:boolean=false;
  public idActor:number=0;
  public hasErrors!:boolean;

  @Output() onCreateActor:EventEmitter<Actor> = new EventEmitter<Actor>();

  constructor (
    private fb:FormBuilder,
    private actorService:ActorService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private validationService:ValidationService) {

       this.hasErrors=false;
    }


  ngOnInit(): void {

    this.route.queryParams.subscribe (params => {
      this.idActor = params['id'];
      if (this.idActor !== undefined){
        this.isEdit = true;
      }
    })

    this.setTitle();

    this.newActorForm = this.fb.group ({
      name:['',[Validators.required,Validators.maxLength(45),Validators.pattern(customPatterns.namesPattern)]],
      surnames:['',[Validators.required,Validators.maxLength(45),Validators.pattern(customPatterns.namesPattern)]],
    });

    if (this.isEdit){
      //Modo editar Escritor existente
       this.editActor(this.idActor);
    }
  }

  ngDoCheck(): void {
    if (!this.newActorForm.valid) this.hasErrors = true
    else this.hasErrors = false;
  }


  saveActor(){
      this.checkFormMessage();
      if(!this.hasErrors){
        this.formToActor();
        this.actorService.addActor(this.actor).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Actor añadido con éxito'});
            this.onCreateActor.emit(this.actor);
            this.newActorForm.reset();
          }
        });
      }
  }

  editActor(id:number){
      this.actorService.getActorById(id).subscribe ({
      next: (value) =>{
        this.editMode(value);
        console.log(value);
      },
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:'Actor cargado con éxito'})
    })
  }

  updateActor(){
    this.checkFormMessage();
    if(!this.hasErrors){
      this.formToActor();
      this.actorService.updateActor(this.actor).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Actor actualizado con éxito'});
            this.newActorForm.reset();
        }
      });
    }
  }

  formToActor ():void{

    const writerFormValues = this.newActorForm.value;

    this.actor = {
      id:this.idActor,
      name:writerFormValues.name,
      surnames:writerFormValues.surnames,
    }

    console.log (this.actor);
  }

  setTitle ():void{
    if (this.isEdit) this.title='Modificar Actor';
    else this.title='Nuevo Actor'
  }

    resetForm ():void {
      this.newActorForm.reset();
    }

    editMode(actor:Actor):void {
      console.log(actor);

      this.newActorForm.setValue({
      name:actor.name,
      surnames:actor.surnames,
    });
  }


  getFieldError (field:string):string|null{
    return this.validationService.getFieldError(field,this.newActorForm);
  }

  isValidField (field:string):boolean | null {
    return this.newActorForm.controls[field].errors && this.newActorForm.controls[field].touched;
  }

  checkFormMessage(){
    if (!this.newActorForm.valid){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
      return this.newActorForm.markAllAsTouched();

    }
}
}
