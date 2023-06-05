import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CopyManagementRoutingModule } from './copy-management-routing.module';
import { AddNewCopyPageComponent } from './pages/add-new-copy-page/add-new-copy-page.component';
import { SharedModule } from 'primeng/api';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AddNewCopyModalComponent } from './pages/add-new-copy-modal/add-new-copy-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewCopiesResourceModalComponent } from './pages/view-copies-resource-modal/view-copies-resource-modal.component';



@NgModule({
  declarations: [
    AddNewCopyPageComponent,
    AddNewCopyModalComponent,
    ViewCopiesResourceModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CopyManagementRoutingModule,
    SharedModule,
    PrimeNgModule
  ]
})
export class CopyManagementModule { }
