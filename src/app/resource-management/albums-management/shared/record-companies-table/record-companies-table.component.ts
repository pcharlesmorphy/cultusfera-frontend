import { Component, Input } from '@angular/core';
import { RecordCompany } from '../../interfaces/Album.interface';
import { RecordCompanyService } from '../../services/record-company.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'shared-record-companies-table',
  templateUrl: './record-companies-table.component.html',
  styleUrls: ['./record-companies-table.component.css']
})
export class RecordCompaniesTableComponent {
  @Input('title') title: string = '';
  @Input('recordCompanies') recordCompanies: RecordCompany[] = [];

  constructor (
    private recordCompanyService:RecordCompanyService ,
    private confirmationService:ConfirmationService ,
    private messageService:MessageService ) {}

  onDelete(recordCompany:RecordCompany){
    this.recordCompanyService.deleteRecordCompanyById(recordCompany.id!).subscribe({
      error: (e) =>  {
        this.messageService.add({severity:'error',summary:'Error',detail:e.error});
        setTimeout (()=>{
          location.reload();
        },1000);
      },
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:`Discográfica ${recordCompany.name} eliminada con éxito`})
    });
    this.recordCompanies = this.recordCompanies.filter ( b => b.id !== recordCompany.id);
  }

  confirmDelete(recordCompany:RecordCompany){
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quiere borrar esta discográfica?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.onDelete(recordCompany);
      },
      reject: (type:any) => {
          switch (type) {
              case ConfirmEventType.REJECT:
              case ConfirmEventType.CANCEL:
                  this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: `Cancelaste eliminar la editorial ${recordCompany.name}` });
                  break;
          }
      }
    });

  }
}
