import { Component, Input } from '@angular/core';
import { BookPublisher } from '../../../interfaces/Book.interface';
import { BookPublisherService } from '../../../services/book-publisher.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';


@Component({
  selector: 'shared-book-publisher-table',
  templateUrl: './book-publishers-table.component.html',
  styleUrls: ['./book-publishers-table.component.css']
})
export class BookPublisherTableComponent {
  @Input('title') title: string = '';
  @Input('publishers') publishers: BookPublisher[] = [];

  constructor (
    private publisherService:BookPublisherService ,
    private confirmationService:ConfirmationService ,
    private messageService:MessageService ) {}

  onDelete(publisher:BookPublisher){
    this.publisherService.deleteBookPublisherById(publisher.id!).subscribe({
      error: (e) =>  this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:`Editorial ${publisher.name} eliminada con éxito`})
    });
    this.publishers = this.publishers.filter ( b => b.id !== publisher.id);
  }

  confirmDelete(publisher:BookPublisher){
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quiere borrar esta editorial?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.onDelete(publisher);
      },
      reject: (type:any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: `Cancelaste eliminar la editorial ${publisher.name}` });
                  break;
          }
      }
    });

  }
}
