import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricSearchRoutingModule } from './historic-search-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule} from '@angular/forms';
import { HistoricByResourcePageComponent } from './pages/historic-by-resource-page/historic-by-resource-page.component';
import { HistoricByUserPageComponent } from './pages/historic-by-user-page/historic-by-user-page.component';
import { TransactionsTableComponent } from './shared/components/transactions-table/transactions-table.component';



@NgModule({
  declarations: [
      HistoricByResourcePageComponent,
      HistoricByUserPageComponent,
      TransactionsTableComponent,

  ],
  imports: [
    CommonModule,
    HistoricSearchRoutingModule,
    PrimeNgModule,
    FormsModule,
  ],
  exports: [
    TransactionsTableComponent
  ]

})
export class HistoricSearchModule { }
