import { ValidationService } from './../../../shared/services/validation.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Penalty, PenaltyReason } from '../../interfaces/penalty.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/user-management/service/user.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user-management/interface/User.interface';
import { PenaltyService } from '../../services/penalty.service';


@Component({
  selector: 'app-add-new-penalty-modal-page',
  templateUrl: './add-new-penalty-modal-page.component.html',
  styleUrls: ['./add-new-penalty-modal-page.component.css']
})
export class AddNewPenaltyModalPageComponent {
  public penalty!:Penalty;
  public newPenaltyForm!: FormGroup;
  public title:string = 'Nueva Sanción';
  public todayDate:Date = new Date(Date.now());
  public endDate: Date = new Date();
  public locations:Location[] = [];
  public reasons:PenaltyReason[] = [];
  public hasErrors!:boolean;

  @Input() user!:User;
  @Output() onUpdatePenalty:EventEmitter<void>=new EventEmitter<void>;

  constructor (
    private fb:FormBuilder,
    private userService:UserService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private validationService:ValidationService,
    private penaltyService:PenaltyService) {

      this.hasErrors = false;
    }


  ngOnInit(): void {


    this.reasons = this.penaltyService.getPenaltyReasons;
    this.endDate.setDate(this.todayDate.getDate()+30);
    this.newPenaltyForm = this.fb.group ({
      startDate:[this.todayDate.toISOString().split('T')[0]],
      endDate:[this.endDate.toISOString().split('T')[0]],
      reason:['',[Validators.required]],
      comments:[''],
    });
  }

  ngDoCheck(): void {
    if (!this.newPenaltyForm.valid) this.hasErrors = true
    else this.hasErrors = false;
  }

  savePenalty () {
    this.checkFormMessage();
    if (!this.hasErrors){
      this.formToPenalty();
      this.penaltyService.addPenalty(this.penalty).subscribe ({
        error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'La penalización no se ha podido añadir. Intente más tarde'}),
        complete: () => {
          this.messageService.add({severity:'success',summary:'Success',detail:'Penalización realizada con éxito'});
          this.newPenaltyForm.reset();
          this.onUpdatePenalty.emit();
        }
      });
     }
  }

  formToPenalty ():void{

    const penaltyFormValues = this.newPenaltyForm.value;

    this.penalty = {
      startDate:penaltyFormValues.startDate,
      endDate:penaltyFormValues.endDate,
      status:true,
      reason:penaltyFormValues.reason,
      comments:penaltyFormValues.comments,
      user:this.user
    }
  }

    resetForm ():void {
      this.newPenaltyForm.reset();
    }

    getFieldError (field:string):string|null{
      return this.validationService.getFieldError(field,this.newPenaltyForm);
    }

    isValidField (field:string):boolean | null {
      return this.newPenaltyForm.controls[field].errors && this.newPenaltyForm.controls[field].touched;
    }

    checkFormMessage(){
      if (!this.newPenaltyForm.valid){
        this.hasErrors = true;
        this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
        return this.newPenaltyForm.markAllAsTouched();

      }
    }
}
