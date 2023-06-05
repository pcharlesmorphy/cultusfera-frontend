import { StatusCopy, Copy } from './../../../copy-management/interfaces/Copy.interface';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from 'src/app/resource-management/services/resource.service';
import { MessageService } from 'primeng/api';
import { Transaction } from '../../../historic-search/interfaces/Transaction.interface';
import { TransactionService } from '../../service/transaction.service';




@Component({
  selector: 'app-make-loan-modal-page',
  templateUrl: './make-loan-modal-page.component.html',
  styleUrls: ['./make-loan-modal-page.component.css']
})
export class MakeLoanModalPageComponent implements OnInit{

  public newLoanForm!: FormGroup;
  public title:string = 'Nuevo Préstamo';
  public locations:Location[] = [];
  public statusCopies:StatusCopy[] = [];
  public todayDate:Date = new Date(Date.now());
  public endDate: Date = new Date();
  public loan!:Transaction;
  @Input() copy!:Copy;
  @Input() users!:any;
  @Output() onUpdateLoan:EventEmitter<void>=new EventEmitter<void>;


  constructor (
    private fb:FormBuilder,
    private resourceService:ResourceService,
    private messageService:MessageService,
    private transactionService:TransactionService,
    private route:ActivatedRoute) {}


  ngOnInit(): void {

    this.statusCopies = this.resourceService.getStatus;
    console.log(this.users);
    this.endDate.setDate(this.todayDate.getDate() + 21);
    this.newLoanForm = this.fb.group ({
      startDate:[this.todayDate.toISOString().split('T')[0]],
      endDate:[this.endDate.toISOString().split('T')[0]],
      users:[''],
    });

  }

  saveLoan () {

    this.formToLoan();
    this.transactionService.addLoan(this.loan).subscribe ({
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
      complete: () => {
        this.messageService.add({severity:'success',summary:'Success',detail:'Préstamo realizado con éxito'});
        this.newLoanForm.reset();

        this.onUpdateLoan.emit();
      }
    });

  }

  formToLoan ():void{

    const loanFormValues = this.newLoanForm.value;

    this.loan = {
      startDate:new Date(loanFormValues.startDate),
      endDate:new Date(loanFormValues.endDate),
      userId:loanFormValues.users.id,
      copyId:this.copy.id!,
      status:{id:1,type:'Prestamo en curso'}
    }

  }

    resetForm ():void {
      this.newLoanForm.reset();
    }

}
