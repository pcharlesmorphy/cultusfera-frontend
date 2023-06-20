import { Component,  EventEmitter,  OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Copy } from 'src/app/copy-management/interfaces/Copy.interface';
import { MessageService } from 'primeng/api';
import { Transaction } from 'src/app/historic-search/interfaces/Transaction.interface';
import { Resource } from 'src/app/shared/interfaces/Resource.interface';
import { ResourceService } from 'src/app/resource-management/services/resource.service';
import { UserService } from 'src/app/user-management/service/user.service';
import { TransactionService } from '../../service/transaction.service';
import { User } from 'src/app/user-management/interface/User.interface';
import { ReturnLoan } from '../../interface/Loan.interface';

@Component({
  selector: 'app-make-transaction-page',
  templateUrl: './make-transaction-page.component.html',
  styleUrls: ['./make-transaction-page.component.css']
})
export class MakeTransactionPageComponent implements OnInit {

      public title:string ='';
      public resources: Resource[]=[];
      public copies: Copy[]=[];
      public users: User[]=[];
      public selectedCopy!:Copy;

      public loading: boolean = true;
      public isVisibleLoanModal:boolean = false;
      public isVisibleBookingModal:boolean = false;
      public onTransactionUpdate:EventEmitter<void>=new EventEmitter<void>;

      constructor(
        private userService: UserService,
        private transactionService:TransactionService,
        private resourceService: ResourceService,
        private messageService: MessageService,
        ) {}


      ngOnInit() {
          this.getResources();
          this.getUsers();
          this.loading = false;
          this.onTransactionUpdate.subscribe (()=>{
            this.handleTransactionUpdate();
          })
      }


      getStatusSeverity(status: string){
          switch (status) {
              case 'Baja':
                  return 'danger';
              case 'Perdido':
                  return 'danger';
              case 'Disponible':
                  return 'success';
              case 'Prestado':
                  return 'danger';
              case 'Reservado':
                  return 'danger';
              default:
                  return '';
          }
      }

      clear(table: Table) {
        table.clear();
      }


      getResources(){
        this.resourceService.getAllResources().subscribe ({
          next:(resp)=> {
            this.resources = resp;
          }
        });
      }

      getLastCopyTransaction (transactions:Transaction[]):Transaction{

          let isLoanActive:boolean = true;
          let forCopyWithoutTransactions:Transaction = {
              startDate:new Date(),
              copyId:0,
              userId:0,
              status:{id:0,type:"Esta copia nunca ha tenido transacciones"}
          }
          if (transactions.length === 0){
             return forCopyWithoutTransactions;
          }
          let transaction:Transaction = transactions.at(transactions.length - 1)!;

          if (transaction.status?.type.includes("Reserva")) transaction = transactions.at(transactions.length - 2)!;

          return transaction;


      }

      showLoanModal(copy:Copy){
        this.selectedCopy = copy;
        this.isVisibleLoanModal = true;
      }

      showBookingModal (copy:Copy){
        this.selectedCopy = copy;
        this.isVisibleBookingModal = true;
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

      getUserById (id:number):string{
         for (let user of this.users){
            if (user.id === id) return `${user.name} ${user.surnames}`;
         }
         return 'Sin nombre';
      }

      returnLoan (transactions:Transaction[]){
        const transaction:Transaction = this.getLastCopyTransaction(transactions);
        const returnLoan:ReturnLoan = {
          id:transaction.id,
          status:{
            id:2,
            type:'Prestamo finalizado'
          }

        }
        this.transactionService.returnLoan(returnLoan).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'El préstamo no se ha devolver. Intente más tarde'}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Préstamo devuelto con éxito'});
            this.onTransactionUpdate.emit();

          }
        });

      }


      deleteBooking (copy:Copy){

        let bookingId:number|undefined = this.searchBookingCopy(copy.transactions!);
        this.transactionService.deleteBooking(bookingId!).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'La reserva no se ha podido cancelar. Intente más tarde'}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Reserva cancelada con éxito'});
            this.onTransactionUpdate.emit();

          }
        });
      }

    searchBookingCopy (transactions:Transaction[]):number|undefined{

      for(let t of transactions){
        if (t.status?.type === 'Reserva en curso'){
          return t.id;
        }
      }
      return undefined;
    }

    handleTransactionUpdate(){
      this.getResources();
    }

  }

