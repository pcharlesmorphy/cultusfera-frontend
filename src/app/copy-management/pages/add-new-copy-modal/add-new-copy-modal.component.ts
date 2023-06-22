import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResourceService } from '../../../resource-management/services/resource.service';
import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';
import { Copy, StatusCopy, Location } from '../../interfaces/Copy.interface';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import { Resource } from 'src/app/shared/interfaces/Resource.interface';
import { ValidationService } from '../../../shared/services/validation.service';


@Component({
  selector: 'app-add-new-copy-modal',
  templateUrl: './add-new-copy-modal.component.html',
  styleUrls: ['./add-new-copy-modal.component.css']
})
export class AddNewCopyModalComponent implements DoCheck{

  public copy!:Copy;
  public newCopyForm!: FormGroup;
  public title:string = 'Nueva Copia';
  public locations:Location[] = [];
  public statusCopies:StatusCopy[] = [];
  public hasErrors!:boolean;
  @Output() public onCopyCreate:EventEmitter<void>=new EventEmitter<void>;
  @Input() resource!:Resource;



  constructor (
    private fb:FormBuilder,
    private resourceService:ResourceService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private validationService:ValidationService) {

      this.hasErrors = false;
    }


  ngOnInit(): void {

    this.locations =this.resourceService.getLocations;
    this.statusCopies = this.resourceService.getStatus;

    this.newCopyForm = this.fb.group ({
      registrationDate:['',[Validators.required]],
      status:['',[Validators.required]],
      location:['',[Validators.required]],
    });

  }

  ngDoCheck(): void {
    if (!this.newCopyForm.valid) this.hasErrors = true
    else this.hasErrors = false;
  }

  saveCopy () {
    this.checkFormMessage();
    if (!this.hasErrors){
      this.formToCopy();
      this.resourceService.addCopy(this.copy).subscribe ({
        error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'La copia no se ha podido añadir. Intente más tarde'}),
        complete: () => {
          this.messageService.add({severity:'success',summary:'Success',detail:'Copia añadida con éxito'});
          this.newCopyForm.reset();
          this.onCopyCreate.emit();
        }
      });
     }
  }

  formToCopy ():void{

    const copyFormValues = this.newCopyForm.value;

    this.copy = {
      registrationDate:copyFormValues.registrationDate,
      status:copyFormValues.status,
      location:copyFormValues.location,
      resource:this.resource
    }


  }


    resetForm ():void {
      this.newCopyForm.reset();
    }

    getFieldError (field:string):string|null{
      return this.validationService.getFieldError(field,this.newCopyForm);
    }

    isValidField (field:string):boolean | null {
      return this.newCopyForm.controls[field].errors && this.newCopyForm.controls[field].touched;
    }

    checkFormMessage(){
      if (!this.newCopyForm.valid){
        this.hasErrors = true;
        this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
        return this.newCopyForm.markAllAsTouched();

      }
    }

}
