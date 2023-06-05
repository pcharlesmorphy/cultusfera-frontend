import { Component, Input } from '@angular/core';
import { DirectorService } from '../../services/director.service';
import { Director } from '../../interfaces/Movie.interface';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'shared-directors-table',
  templateUrl: './directors-table.component.html',
  styleUrls: ['./directors-table.component.css']
})
export class DirectorsTableComponent {
  @Input('title') title: string = '';
  @Input('directors') directors: Director[] = [];

  constructor (
    private writerService:DirectorService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService) {}

  onDelete(director:Director){
    this.writerService.deleteDirectorById(director.id!).subscribe({
      error: (e) =>  {
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
        setTimeout (()=>{
          location.reload();
        },1000);
      },
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:`Director ${director.name} ${director.surnames} eliminado con éxito`})
    });
    this.directors = this.directors.filter ( b => b.id !== director.id);
  }

  confirmDelete(director:Director){
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quiere borrar este director?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.onDelete(director);
      },
      reject: (type:any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: `Cancelaste eliminar el director ${director.surnames}` });
                  break;
          }
      }
    });

  }
}
