import { Component, Input } from '@angular/core';
import { Writer } from '../../../../books-management/interfaces/Book.interface';
import { WriterService } from '../../../services/writer.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';


@Component({
  selector: 'shared-writers-table',
  templateUrl: './writers-table.component.html',
  styleUrls: ['./writers-table.component.css']
})
export class WritersTableComponent {
  @Input('title') title: string = '';
  @Input('writers') writers: Writer[] = [];

  constructor (
    private writerService:WriterService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService) {}

  onDelete(writer:Writer){
    this.writerService.deleteWriterById(writer.id!).subscribe({
      error: (e) =>  {
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
        setTimeout (()=>{
          location.reload();
        },1000);
      },
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:`Escritor ${writer.name} ${writer.surnames} eliminado con éxito`})
    });
    this.writers = this.writers.filter ( b => b.id !== writer.id);
  }

  confirmDelete(writer:Writer){
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quiere borrar este escritor?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.onDelete(writer);
      },
      reject: (type:any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: `Cancelaste eliminar el escritor ${writer.surnames}` });
                  break;
          }
      }
    });

  }
}
