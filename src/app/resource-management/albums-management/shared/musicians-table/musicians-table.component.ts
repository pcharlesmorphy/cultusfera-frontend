import { Component, Input } from '@angular/core';
import { Musician } from '../../interfaces/Album.interface';
import { MusicianService } from '../../services/musician.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'shared-musicians-table',
  templateUrl: './musicians-table.component.html',
  styleUrls: ['./musicians-table.component.css']
})
export class MusiciansTableComponent {
  @Input('title') title: string = '';
  @Input('musicians') musicians: Musician[] = [];

  constructor (
    private writerService:MusicianService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService) {}

  onDelete(musician:Musician){
    this.writerService.deleteMusicianById(musician.id!).subscribe({
      error: (e) =>  {
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
        setTimeout (()=>{
          location.reload();
        },1000);
      },
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:`Músico ${musician.name} ${musician.surnames} eliminado con éxito`})
    });
    this.musicians = this.musicians.filter ( b => b.id !== musician.id);
  }

  confirmDelete(musician:Musician){
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quiere borrar este músico?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.onDelete(musician);
      },
      reject: (type:any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: `Cancelaste eliminar el músico ${musician.surnames}` });
                  break;
          }
      }
    });

  }
}
