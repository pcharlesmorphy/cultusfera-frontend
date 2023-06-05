import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../interfaces/UserLogin.interface';
import { HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/user-management/interface/User.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public id: string = '';
  public title = '';
  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService) {
  }

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
    this.title = 'Login User';
  }

  public resetForm(): void {
    this.loginForm.reset();
  }

  private loginFormToLoginInterface(): UserLogin {
    return {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    }
  }

  public loginUser(): void {

      const login = this.loginFormToLoginInterface();

      this.authService.login(login).subscribe({
        next: (value) => {
          this.authService.setUser(value);

          if (value.role.type === 'Librarian'){
            this.router.navigate(['gestion-recursos'])
          } else if (value.role.type === 'Admin'){
            this.router.navigate(['gestion-usuarios'])
          } else if (value.role.type === 'User'){
            this.router.navigate(['usuarios-biblioteca']);
          }

        },
        error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'El Usuario o el Password son incorrectos'}),

      });
    }

}
