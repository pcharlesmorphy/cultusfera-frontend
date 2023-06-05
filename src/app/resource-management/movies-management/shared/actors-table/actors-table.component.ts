import { Component, Input } from '@angular/core';
import { ActorService } from '../../services/actor.service';
import { Actor } from '../../interfaces/Movie.interface';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'shared-actors-table',
  templateUrl: './actors-table.component.html',
  styleUrls: ['./actors-table.component.css']
})
export class ActorsTableComponent {
  @Input('title') title: string = '';
  @Input('actors') actors: Actor[] = [];

  constructor (
    private actorService:ActorService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService) {}

  onDelete(actor:Actor){
    this.actorService.deleteActorById(actor.id!).subscribe({
      error: (e) =>  {
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
        setTimeout (()=>{
          location.reload();
        },1000);
      },
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:`Actor ${actor.name} ${actor.surnames} eliminado con éxito`})
    });
    this.actors = this.actors.filter ( b => b.id !== actor.id);
  }

  confirmDelete(actor:Actor){
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quiere borrar este actor?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.onDelete(actor);
      },
      reject: (type:any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: `Cancelaste eliminar el actor ${actor.surnames}` });
                  break;
          }
      }
    });

  }
}
