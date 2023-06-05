import { Component } from '@angular/core';
import { User } from 'src/app/user-management/interface/User.interface';
import { TransactionStatus,  FrontendTransaction  } from 'src/app/historic-search/interfaces/Transaction.interface';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TransactionService } from 'src/app/transaction-management/service/transaction.service';
import { UserService } from 'src/app/user-management/service/user.service';

@Component({
  selector: 'app-active-user-bookings-page',
  templateUrl: './active-user-bookings-page.component.html',
  styleUrls: ['./active-user-bookings-page.component.css']
})
export class ActiveUserBookingsPageComponent {
  public user!: User;
  public users:any[]=[];
  public title:string='';
  public status:TransactionStatus[]=[];
  public isResults:boolean = false;
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
    this.title = "Tus Reservas actuales";
  }


  getActiveUserBooking(){
    this.transactionService.getActiveUserBooking(this.user.username).subscribe ({
      next: (resp:any) => {
        if (resp.length > 0) {
            this.isResults=true;
            this.transactions = resp;
        }
      }
  });
  }

  negativeMessage():Message[] { return [
    { severity: 'info',
      summary: 'Info',
      detail: `El usuario:  ${this.user.username.toLocaleUpperCase()}
      no tiene ninguna reserva en curso.`
    } ];
  }

  onSearch():void {
    this.isResults = false;
    this.getActiveUserBooking();
    if (!this.isResults){
      console.log("Sin resultados");
      this.messageWithoutResults = this.negativeMessage();
    }
  }
}
