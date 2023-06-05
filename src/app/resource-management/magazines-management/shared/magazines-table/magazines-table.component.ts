import { Component, Input, Output , EventEmitter} from '@angular/core';
import { MessageService, ConfirmEventType , ConfirmationService} from 'primeng/api';
import { Magazine } from '../../interfaces/Magazine.interface';
import { DataMagazineService } from '../../services/data-magazine.service';
import { MagazineService } from '../../services/magazine.service';
import { User } from 'src/app/user-management/interface/User.interface';
import { Resource } from 'src/app/shared/interfaces/Resource.interface';
import { DataResourceService } from 'src/app/shared/services/data-resource.service';

@Component({
  selector: 'shared-magazines-table',
  templateUrl: './magazines-table.component.html',
  styleUrls: ['./magazines-table.component.css']
})
export class MagazinesTableComponent {
  @Input('title') title: string = '';
  @Input('magazines') magazines: Magazine[] = [];
  @Input('user') public user!:User;

  @Output() onDeleteMagazine:EventEmitter<Magazine> = new EventEmitter<Magazine>();

  constructor (
    private magazineService:MagazineService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    private dataMagazine:DataMagazineService,
    private dataResource: DataResourceService ) {}

  onDelete(magazine:Magazine){
    this.magazineService.deleteMagazineById(magazine.id!).subscribe({
      error: (e) =>  {
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
        setTimeout (()=>{
          location.reload();
        },1000);
      },
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:`Libro ${magazine.title} eliminado con éxito`})
    });
    this.magazines = this.magazines.filter ( b => b.id !== magazine.id);
  }

  confirmDelete(magazine:Magazine){
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quiere borrar este libro?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.onDelete(magazine);
      },
      reject: (type:any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: `Cancelaste eliminar el libro ${magazine.title}` });
                  break;
          }
      }
    });

  }

  getDataMagazine(magazine:Magazine):void{
      this.dataMagazine.magazine = magazine;
  }

  getDataResource (resource:Resource):void{
    this.dataResource.resource = resource;
}
}
