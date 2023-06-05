import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { NewUserPageComponent } from './pages/new-user-page/new-user-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUsersPageComponent } from './pages/list-users-page/list-users-page.component';


@NgModule({
  declarations: [
    NewUserPageComponent,
    ListUsersPageComponent,
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule
  ]
})
export class UserManagementModule { }
