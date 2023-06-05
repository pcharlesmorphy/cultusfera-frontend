import { Component, Input } from '@angular/core';
import { MagazinePublisher } from '../../interfaces/Magazine.interface';
import { MagazinePublisherService } from '../../services/magazine-publisher.service';
import { ConfirmationService , ConfirmEventType} from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'shared-magazine-publishers-table',
  templateUrl: './magazine-publishers-table.component.html',
  styleUrls: ['./magazine-publishers-table.component.css']
})
export class MagazinePublishersTableComponent {
  @Input('title') title: string = '';
  @Input('publishers') publishers: MagazinePublisher[] = [];

  constructor (
    private publisherService:MagazinePublisherService ,
    private confirmationService:ConfirmationService ,
    private messageService:MessageService ) {}

  onDelete(publisher:MagazinePublisher){
    this.publisherService.deleteMagazinePublisherById(publisher.id!).subscribe({
      error: (e) =>  {
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
        setTimeout (()=>{
          location.reload();
        },1000);
      },
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:`Editorial ${publisher.name} eliminada con éxito`})
    });
    this.publishers = this.publishers.filter ( b => b.id !== publisher.id);
  }

  confirmDelete(publisher:MagazinePublisher){
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
