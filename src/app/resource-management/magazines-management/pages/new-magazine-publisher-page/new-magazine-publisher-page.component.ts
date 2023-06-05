import { Component, Output, EventEmitter, DoCheck } from '@angular/core';
import { MagazinePublisher } from '../../interfaces/Magazine.interface';
import { MessageService } from 'primeng/api';
import { MagazinePublisherService } from '../../services/magazine-publisher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as customPatterns from '../../../../shared/interfaces/ValidatorPatterns';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'app-new-magazine-publisher-page',
  templateUrl: './new-magazine-publisher-page.component.html',
  styleUrls: ['./new-magazine-publisher-page.component.css']
})
export class NewMagazinePublisherPageComponent implements DoCheck{
  public publisher!:MagazinePublisher;
  public newMagazinePublisherForm!: FormGroup;
  public title:string = '';
  public isEdit:boolean=false;
  public idMagazinePublisher:number=0;
  public hasErrors!:boolean;

  @Output() onCreateMagazinePublisher:EventEmitter<MagazinePublisher> = new EventEmitter<MagazinePublisher>();

  constructor (
    private fb:FormBuilder,
    private publisherService:MagazinePublisherService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private validationService:ValidationService) {

      this.hasErrors = false;
    }


  ngOnInit(): void {

    this.route.queryParams.subscribe (params => {
      this.idMagazinePublisher = params['id'];
      if (this.idMagazinePublisher !== undefined){
        this.isEdit = true;
      }
    })

    this.setTitle();

    this.newMagazinePublisherForm = this.fb.group ({
      name:['',[Validators.required,Validators.pattern(customPatterns.alphaPattern),Validators.maxLength(25)]],
    });

    if (this.isEdit){
      //Modo editar Escritor existente
       this.editMagazinePublisher(this.idMagazinePublisher);
    }
  }


  ngDoCheck(): void {
    if (!this.newMagazinePublisherForm.valid) this.hasErrors = true
    else this.hasErrors = false;
  }

  saveMagazinePublisher(){
    this.checkFormMessage();
    if(!this.hasErrors){
        this.formToMagazinePublisher();
        this.publisherService.addMagazinePublisher(this.publisher).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Editorial añadida con éxito'});
            this.onCreateMagazinePublisher.emit(this.publisher);
            this.newMagazinePublisherForm.reset();
          }
        });
    }
  }

  editMagazinePublisher(id:number){
      this.publisherService.getMagazinePublisherById(id).subscribe ({
      next: (value) =>{
        this.editMode(value);
        console.log(value);
      },
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:'Editorial cargada con éxito'})
    })
  }

  updateMagazinePublisher(){
    this.checkFormMessage();
    if(!this.hasErrors){
      this.formToMagazinePublisher();
      this.publisherService.updateMagazinePublisher(this.publisher).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Editorial actualizada con éxito'});
            this.newMagazinePublisherForm.reset();
        }
      });
    }
  }

  formToMagazinePublisher ():void{

    const publisherFormValues = this.newMagazinePublisherForm.value;

    this.publisher = {
      id:this.idMagazinePublisher,
      name:publisherFormValues.name,
    }

    console.log (this.publisher);
  }

  setTitle ():void{
    if (this.isEdit) this.title='Modificar Editorial';
    else this.title='Nueva Editorial'
  }

    resetForm ():void {
      this.newMagazinePublisherForm.reset();
    }

    editMode(publisher:MagazinePublisher):void {
      console.log(publisher);

      this.newMagazinePublisherForm.setValue({
      name:publisher.name,
    });
  }

    getFieldError (field:string):string|null{
      return this.validationService.getFieldError(field,this.newMagazinePublisherForm);
    }

    isValidField (field:string):boolean | null {
      return this.newMagazinePublisherForm.controls[field].errors && this.newMagazinePublisherForm.controls[field].touched;
    }

    checkFormMessage(){
      if (!this.newMagazinePublisherForm.valid){
        this.hasErrors = true;
        this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
        return this.newMagazinePublisherForm.markAllAsTouched();

      }
    }
}
