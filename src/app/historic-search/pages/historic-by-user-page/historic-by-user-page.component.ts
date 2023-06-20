import { Component, Input } from '@angular/core';
import { Transaction, TransactionStatus, FrontendTransaction} from '../../interfaces/Transaction.interface';
import { Message, MessageService } from 'primeng/api';
import { HistoricService } from '../../services/historic.service';
import { UserService } from 'src/app/user-management/service/user.service';
import { User } from 'src/app/user-management/interface/User.interface';
import { TransactionService } from '../../../transaction-management/service/transaction.service';

@Component({
  selector: 'app-historic-by-user-page',
  templateUrl: './historic-by-user-page.component.html',
  styleUrls: ['./historic-by-user-page.component.css']
})

export class HistoricByUserPageComponent {

    public selectedUser!:any;
    public users:any[]=[];
    public title:string='';
    public status:TransactionStatus[]=[];
    public searchResult:boolean = false;
    public transactions:FrontendTransaction[]=[];
    public messageWithoutResults:Message[]=[];
    public isActiveLoans:boolean = false;

    constructor (
      private messageService:MessageService,
      private historicService:HistoricService,
      private userService:UserService,
      private transactionService:TransactionService){}

    ngOnInit(): void {
      this.getUsers();
      this.status = this.historicService.getTransactionStatus;
    }

    getTransactionsByUser(){

      this.historicService.getHistoricalByUser(this.selectedUser.name,this.selectedUser.surnames).subscribe ({
        next: (resp:any) => {
          if (resp.length > 0) {
              this.searchResult=true;
              this.transactions = resp;
              this.title = `Histórico de Préstamos de ${this.selectedUser.name} ${this.selectedUser.surnames}`;
          }
        }
    });
    }

    getActiveTransactionsByUser(){
      this.transactionService.getActiveUserTransactions(this.selectedUser.name,this.selectedUser.surnames).subscribe ({
        next: (resp:any) => {
          if (resp.length > 0) {
              this.searchResult=true;
              this.transactions = resp;
              this.title = `Préstamos en curso de ${this.selectedUser.name} ${this.selectedUser.surnames}`;
          }
        }
    });
    }

    negativeMessage():Message[] { return [
      { severity: 'info',
        summary: 'Info',
        detail: `La búsqueda con el usuario:  ${this.selectedUser.name.toLocaleUpperCase()} ${this.selectedUser.surnames.toLocaleUpperCase()}
        no arroja ningún resultado.`
      } ];
    }

    onSearch():void {
      this.searchResult = false;
      if (this.isActiveLoans){
        this.getActiveTransactionsByUser();
      }
      else{
        this.getTransactionsByUser();
      }

      if (!this.searchResult){
        this.messageWithoutResults = this.negativeMessage();
      }
    }

    getUsers (){
      this.userService.getClientUsers().subscribe ({
        next:(resp)=> {
          this.users = resp;
          this.users = this.users.map((users:User) => {
            return{
              ...users,
              nameSelect: users.surnames + ' , ' + users.name
            };
          });
        }
      });
    }
}
