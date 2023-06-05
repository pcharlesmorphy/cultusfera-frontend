import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user-management/interface/User.interface';
import { MessageService, Message } from 'primeng/api';
import { UserService } from 'src/app/user-management/service/user.service';
import { HistoricService } from 'src/app/historic-search/services/historic.service';
import { TransactionStatus } from 'src/app/historic-search/interfaces/Transaction.interface';
import { FrontendTransaction } from 'src/app/historic-search/interfaces/Transaction.interface';

@Component({
  selector: 'app-historic-by-user-page',
  templateUrl: './historic-by-user-page.component.html',
  styleUrls: ['./historic-by-user-page.component.css']
})
export class HistoricByUserPageComponent implements OnInit{

      public user!: User;
      public users:any[]=[];
      public title:string='';
      public status:TransactionStatus[]=[];
      public searchResult:boolean = false;
      public transactions:FrontendTransaction[]=[];
      public messageWithoutResults:Message[]=[];

      constructor (
        private authService:AuthService,
        private messageService:MessageService,
        private userService:UserService,
        private historicService:HistoricService){}


      ngOnInit(): void {
        this.user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);
        this.onSearch();
        this.title = "Histórico de tus transacciones";
        this.status = this.historicService.getTransactionStatus;
      }


      getTransactionsByUsername(){
        this.historicService.getHistoricalByUsername(this.user.username).subscribe ({
          next: (resp:any) => {
            if (resp.length > 0) {
                this.searchResult=true;
                this.transactions = resp;
            }
          }
      });
      }

      negativeMessage():Message[] { return [
        { severity: 'info',
          summary: 'Info',
          detail: `El usuario:  ${this.user.username.toLocaleUpperCase()}
          aún no tiene ningún préstamo finalizado.`
        } ];
      }

      onSearch():void {
        this.searchResult = false;
        this.getTransactionsByUsername();
        if (!this.searchResult){
          this.messageWithoutResults = this.negativeMessage();
        }
      }

  }


