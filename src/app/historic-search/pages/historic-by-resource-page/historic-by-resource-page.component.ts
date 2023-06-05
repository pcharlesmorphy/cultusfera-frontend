import { Component, OnInit } from '@angular/core';
import { MessageService,Message } from 'primeng/api';
import { HistoricService } from '../../services/historic.service';
import { TransactionStatus, FrontendTransaction} from '../../interfaces/Transaction.interface';
import { TransactionService } from 'src/app/transaction-management/service/transaction.service';

@Component({
  selector: 'app-historic-by-resource-page',
  templateUrl: './historic-by-resource-page.component.html',
  styleUrls: ['./historic-by-resource-page.component.css']
})
export class HistoricByResourcePageComponent implements OnInit{

  public resourceTitle:string='';
  public title:string='';
  public status:TransactionStatus[]=[];
  public searchResult:boolean = false;
  public transactions:FrontendTransaction[]=[];
  public messageWithoutResults:Message[]=[];
  public isActiveLoans:boolean=false;

  constructor (
    private messageService:MessageService,
    private historicService:HistoricService,
    private transactionService:TransactionService){}

  ngOnInit(): void {
    this.status = this.historicService.getTransactionStatus;
  }

  getTransactionsByResource(){
    this.historicService.getHistoricalByResource(this.resourceTitle).subscribe ({
      next: (resp:any) => {
         if (resp.length > 0) {
            this.searchResult=true;
            this.transactions = resp;
            this.title = `Histórico de Préstamos de ${this.transactions[0].resourceTitle}`;
            console.log(resp);
         }
      }
   });
  }


  getActiveTransactionsByResource(){
    this.transactionService.getActiveResourceLoans(this.resourceTitle).subscribe ({
      next: (resp:any) => {
         if (resp.length > 0) {
            this.searchResult=true;
            this.transactions = resp;
            this.title = `Préstamos en curso de ${this.transactions[0].resourceTitle}`;
            console.log(resp);
         }
      }
   });
  }


  negativeMessage():Message[] { return [
    { severity: 'info',
      summary: 'Info',
      detail: `La búsqueda con el recurso:  ${this.resourceTitle.toLocaleUpperCase()}
      no arroja ningún resultado.`
    } ];
  }

  onSearch():void {

    this.searchResult =false;

    if (this.isActiveLoans){
      this.getActiveTransactionsByResource();
    }else {
      this.getTransactionsByResource();
    }


    if (!this.searchResult){
      this.messageWithoutResults = this.negativeMessage();
    }
  }
}
