import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionManagementRoutingModule } from './transaction-management-routing.module';
import { MakeTransactionPageComponent } from './pages/make-transaction-page/make-transaction-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakeBookingModalPageComponent } from './pages/make-booking-modal-page/make-booking-modal-page.component';
import { MakeLoanModalPageComponent } from './pages/make-loan-modal-page/make-loan-modal-page.component';



@NgModule({
  declarations: [
      MakeTransactionPageComponent,
      MakeBookingModalPageComponent,
      MakeLoanModalPageComponent,

  ],
  imports: [
    CommonModule,
    TransactionManagementRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    FormsModule,
  ]
})
export class TransactionManagementModule { }
