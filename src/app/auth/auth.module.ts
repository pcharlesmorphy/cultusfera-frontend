import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule
  ],
  providers: [
      AuthService
  ]
})
export class AuthModule { }
