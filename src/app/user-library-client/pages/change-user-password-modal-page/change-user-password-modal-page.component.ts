import { Component, DoCheck, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { User } from 'src/app/user-management/interface/User.interface';
import { UserService } from 'src/app/user-management/service/user.service';

@Component({
  selector: 'app-change-user-password-modal-page',
  templateUrl: './change-user-password-modal-page.component.html',
  styleUrls: ['./change-user-password-modal-page.component.css']
})
export class ChangeUserPasswordModalPageComponent implements OnInit,DoCheck{

  public updatePasswordForm!:FormGroup;
  public user!:User;
  public title:string = 'Modificar Password';
  public hasErrors!:boolean;

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private messageService:MessageService,
    private validationService:ValidationService
  ) {}


  ngOnInit(): void {

    this.hasErrors = false;
    this.user = JSON.parse(sessionStorage.getItem('loggedInUser')!);
    this.updatePasswordForm = this.fb.group ({
      password:['',[Validators.required,Validators.maxLength(25)]],
      repeatPassword:['',[Validators.required,Validators.maxLength(25)]],
    });
  }

  ngDoCheck(): void {
      if (!this.updatePasswordForm.valid) this.hasErrors = true
      else this.hasErrors = false;
  }


  isValidField (field:string):boolean | null {
    return this.updatePasswordForm.controls[field].errors && this.updatePasswordForm.controls[field].touched;
  }

  getFieldError (field:string):string|null{
    return this.validationService.getFieldError(field,this.updatePasswordForm);
  }

  resetForm ():void {
    this.updatePasswordForm.reset();
  }

  checkFormMessage(){
    const password = this.updatePasswordForm.get('password')!.value;
    const repeat = this.updatePasswordForm.get('repeatPassword')!.value;

    if (password !== repeat){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Las contraseñas no son iguales. Vuelve a intentarlo.'});
      return this.updatePasswordForm.markAllAsTouched();
    }
    if (!this.updatePasswordForm.valid){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
      return this.updatePasswordForm.markAllAsTouched();

    }
  }

  updateUserPassword(){
    this.checkFormMessage();
    if (!this.hasErrors){
      this.userService.updateUserPassword(this.user.id!,this.updatePasswordForm.get('password')!.value).subscribe ({
        error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'El password no se ha podido modificar. Intente más tarde'}),
        complete: () => {
          this.messageService.add({severity:'success',summary:'Success',detail:'Password modificado con éxito'});
          this.updatePasswordForm.reset();
        }
      });
    }
  }

}


