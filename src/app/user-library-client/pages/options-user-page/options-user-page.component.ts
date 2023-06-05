

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user-management/service/user.service';
import { User, UserRole } from 'src/app/user-management/interface/User.interface';
import { MessageService } from 'primeng/api';
import * as customPatterns from '../../../shared/interfaces/ValidatorPatterns';
import { ValidationService } from '../../../shared/services/validation.service';
import { UpdateUser } from '../../../user-management/interface/User.interface';

@Component({
  selector: 'app-options-user-page',
  templateUrl: './options-user-page.component.html',
  styleUrls: ['./options-user-page.component.css']
})
export class OptionsUserPageComponent implements OnInit{

  public updateUserForm!:FormGroup;
  public storedDataUser!:User;
  public user!:User;
  public userUpdate!:UpdateUser;
  public roles:UserRole[]=[];
  public title:string = 'Modificar Datos';
  public hasErrors!:boolean;
  public isVisibleChangePasswordModal:boolean = false;


  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private messageService:MessageService,
    private validationService:ValidationService
  ) {}

  ngOnInit(): void {

    this.hasErrors=false;
    this.roles = this.userService.getUserRoles;
    this.storedDataUser = JSON.parse(sessionStorage.getItem('loggedInUser')!);
    this.updateUserForm = this.fb.group ({
      name:[''],
      surnames: [''],
      address:['',[Validators.required,Validators.maxLength(45),Validators.pattern(customPatterns.alphaPattern)]],
      email:['',[Validators.required,Validators.maxLength(30),Validators.pattern(customPatterns.emailPattern)]],
      nif:['',[Validators.required,Validators.maxLength(9),Validators.pattern(customPatterns.nifPattern)]],
      phone:['',[Validators.required,Validators.maxLength(10),Validators.pattern(customPatterns.numericPattern)]],
      username:[''],
      regDate:['']
    })

    this.getUser(this.storedDataUser.id!);
  }

  updateUser(){
    this.checkFormMessage();
    if (!this.hasErrors){
      this.formToUser();
      this.userService.updateUserByUser(this.userUpdate).subscribe ({
        error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'Los datos de usuario no se han podido actualizar. Intente más tarde'}),
        complete: () => {
          this.messageService.add({severity:'success',summary:'Success',detail:'Datos de usuario actualizados con éxito'});
          this.updateUserForm.reset();
        }
      });
    }
  }

  getUser (id:number){
    this.userService.getUserById(id).subscribe ({
      next: (resp) => {
        this.dataUserToForm(resp);
      },
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'Los datos de usuario no se han podido cargar. Intente más tarde'}),
      complete: () => {
        this.messageService.add({severity:'success',summary:'Success',detail:'Datos de usuario cargados con éxito'});
      }
    });
  }

  formToUser():void{
    const userFormValues = this.updateUserForm.value;
    this.userUpdate = {
      id:this.user.id,
      address: userFormValues.address,
      email: userFormValues.email,
      phone: userFormValues.phone,
    }
  }

  getFieldError (field:string):string|null{
    return this.validationService.getFieldError(field,this.updateUserForm);
  }

  isValidField (field:string):boolean | null {
    return this.updateUserForm.controls[field].errors && this.updateUserForm.controls[field].touched;
  }

  checkFormMessage(){
    if (!this.updateUserForm.valid){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
      return this.updateUserForm.markAllAsTouched();

    }
}
  showChangeUserPasswordModal(){
    this.isVisibleChangePasswordModal = true;
  }

  dataUserToForm(user:User):void {
    this.updateUserForm.setValue({
      name:user.name,
      surnames:user.surnames,
      address:user.address,
      email:user.email,
      nif:user.nif,
      phone:user.phone,
      username:user.username,
      regDate:user.registrationDate
  });
  this.user = user;
}
}

