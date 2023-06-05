import { TransactionService } from './../../../transaction-management/service/transaction.service';
import { Component } from '@angular/core';
import { TransactionStatus } from 'src/app/historic-search/interfaces/Transaction.interface';
import { FrontendTransaction } from 'src/app/historic-search/interfaces/Transaction.interface';
import { User } from 'src/app/user-management/interface/User.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Message, MessageService } from 'primeng/api';
import { UserService } from 'src/app/user-management/service/user.service';


@Component({
  selector: 'app-active-user-loans-page',
  templateUrl: './active-user-loans-page.component.html',
  styleUrls: ['./active-user-loans-page.component.css']
})
export class ActiveUserLoansPageComponent {
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
    private transactionService:TransactionService,
    private userService:UserService){}


  ngOnInit(): void {
    this.user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);
    this.onSearch();
    this.title = "Tus Préstamos actuales";
  }


  getActiveUserLoan(){
    this.transactionService.getActiveUserLoan(this.user.username).subscribe ({
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
      no tiene ningún préstamo en curso.`
    } ];
  }

  onSearch():void {
    this.searchResult = false;
    this.getActiveUserLoan();
    if (!this.searchResult){
      this.messageWithoutResults = this.negativeMessage();
    }
  }
}
