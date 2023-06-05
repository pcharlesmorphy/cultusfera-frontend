import { Component, Input} from '@angular/core';
import { FrontendTransaction, Transaction } from 'src/app/historic-search/interfaces/Transaction.interface';

@Component({
  selector: 'shared-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent {

  @Input('transactions') transactions:FrontendTransaction[]=[];
  @Input('title') title:string='';

}
