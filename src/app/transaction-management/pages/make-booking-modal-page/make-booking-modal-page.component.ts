import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { StatusCopy, Copy } from 'src/app/copy-management/interfaces/Copy.interface';
import { Transaction } from 'src/app/historic-search/interfaces/Transaction.interface';
import { ResourceService } from 'src/app/resource-management/services/resource.service';
import { MessageService } from 'primeng/api';
import { TransactionService } from '../../service/transaction.service';

@Component({
  selector: 'app-make-booking-modal-page',
  templateUrl: './make-booking-modal-page.component.html',
  styleUrls: ['./make-booking-modal-page.component.css']
})
export class MakeBookingModalPageComponent {
  public newBookingForm!: FormGroup;
  public title:string = 'Nueva Reserva';
  public locations:Location[] = [];
  public statusCopies:StatusCopy[] = [];
  public todayDate:Date = new Date(Date.now());
  public endDate: Date = new Date();
  public booking!:Transaction;
  @Input() copy!:Copy;
  @Input() users!:any;
  @Output() onUpdateBooking:EventEmitter<void>=new EventEmitter<void>();

  constructor (
    private fb:FormBuilder,
    private resourceService:ResourceService,
    private messageService:MessageService,
    private transactionService:TransactionService) {}

  ngOnInit(): void {

    this.statusCopies = this.resourceService.getStatus;
    this.newBookingForm = this.fb.group ({
      startDate:[this.todayDate.toISOString().split('T')[0]],
      users:[''],
    });

  }

  saveBooking () {

    this.formToBooking();
    this.transactionService.addBooking(this.booking).subscribe ({
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
      complete: () => {
        this.messageService.add({severity:'success',summary:'Success',detail:'Reserva realizada con éxito'});
        this.newBookingForm.reset();
        this.onUpdateBooking.emit();
      }
    });
  }

  formToBooking ():void{

    const bookingFormValues = this.newBookingForm.value;
    this.booking = {
      startDate:new Date(bookingFormValues.startDate),
      userId:bookingFormValues.users.id,
      copyId:this.copy.id!,
    }
  }

    resetForm ():void {
      this.newBookingForm.reset();
    }

}
