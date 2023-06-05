import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { User, UserRole } from '../../interface/User.interface';
import { MessageService } from 'primeng/api';
import * as customPatterns from '../../../shared/interfaces/ValidatorPatterns';
import { ValidationService } from '../../../shared/services/validation.service';


@Component({
  selector: 'app-new-user-page',
  templateUrl: './new-user-page.component.html',
  styleUrls: ['./new-user-page.component.css']
})
export class NewUserPageComponent implements OnInit {

  public newUserForm!:FormGroup;
  public user!:User;
  public roles:UserRole[]=[];
  public title:string = 'Crear Usuario';
  public hasErrors!:boolean;


  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private messageService:MessageService,
    private validationService:ValidationService
  ) {}

  ngOnInit(): void {

    this.hasErrors=false;
    this.roles = this.userService.getUserRoles;
    this.newUserForm = this.fb.group ({
      name:['',[Validators.required,Validators.maxLength(25),Validators.pattern(customPatterns.namesPattern)]],
      surnames: ['',[Validators.required,Validators.maxLength(45),Validators.pattern(customPatterns.namesPattern)]],
      address:['',[Validators.required,Validators.maxLength(45),Validators.pattern(customPatterns.alphaPattern)]],
      email:['',[Validators.required,Validators.maxLength(30),Validators.pattern(customPatterns.emailPattern)]],
      nif:['',[Validators.required,Validators.maxLength(9),Validators.pattern(customPatterns.nifPattern)]],
      phone:['',[Validators.required,Validators.maxLength(10),Validators.pattern(customPatterns.numericPattern)]],
      username:['',[Validators.required,Validators.maxLength(25),Validators.pattern(customPatterns.lowercaseNamesPattern)]],
      password:['',[Validators.required,Validators.maxLength(25)]],
      role:['',[Validators.required]]
    })
  }

  saveUser(){
    this.checkFormMessage();
    if (!this.hasErrors){
      this.formToUser();
      this.userService.addUser(this.user).subscribe ({
        error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'El Usuario no se ha podido añadir. Intente más tarde'}),
        complete: () => {
          this.messageService.add({severity:'success',summary:'Success',detail:'Usuario añadido con éxito'});
          this.newUserForm.reset();
        }
      });
    }

  }

  formToUser():void{
    const userFormValues = this.newUserForm.value;
    const todayDate = new Date();
    this.user = {
      name: userFormValues.name,
      surnames: userFormValues.surnames,
      address: userFormValues.address,
      email: userFormValues.email,
      nif: userFormValues.nif,
      phone: userFormValues.phone,
      username: userFormValues.username,
      password: userFormValues.password,
      registrationDate: todayDate,
      role: userFormValues.role,
    }
    console.log(this.user);
  }

  resetForm () {
    this.newUserForm.reset();
  }


  getFieldError (field:string):string|null{
    return this.validationService.getFieldError(field,this.newUserForm);
  }

  isValidField (field:string):boolean | null {
    return this.newUserForm.controls[field].errors && this.newUserForm.controls[field].touched;
  }

  checkFormMessage(){
    if (!this.newUserForm.valid){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
      return this.newUserForm.markAllAsTouched();

    }
}


}
