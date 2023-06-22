import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PenaltyManagementRoutingModule } from './penalty-management-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ListUserPageComponent } from './pages/list-user-page/list-user-page.component';
import { AddNewPenaltyModalPageComponent } from './pages/add-new-penalty-modal-page/add-new-penalty-modal-page.component';
import { ViewUserPenaltiesModalPageComponent } from './pages/view-user-penalties-modal-page/view-user-penalties-modal-page.component';



@NgModule({
  declarations: [
    ListUserPageComponent,
    AddNewPenaltyModalPageComponent,
    ViewUserPenaltiesModalPageComponent,
  ],
  imports: [
    CommonModule,
    PenaltyManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PrimeNgModule,
  ]
})
export class PenaltyManagementModule { }
