import { Component, Input, OnInit} from '@angular/core';
import { Copy, StatusCopy, Location } from '../../interfaces/Copy.interface';
import { ResourceService } from '../../../resource-management/services/resource.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-view-copies-resource-modal',
  templateUrl: './view-copies-resource-modal.component.html',
  styleUrls: ['./view-copies-resource-modal.component.css']
})
export class ViewCopiesResourceModalComponent implements OnInit{

    @Input() copies: Copy[]=[];
    public title:string = 'Lista de copias';
    public statusCopies: StatusCopy[] = [];
    public locations: Location[] = [];
    public clonedCopies: { [s: number]: Copy } = {};


    constructor (
      private resourceService:ResourceService,
      private messageService: MessageService,

      ) {}


    ngOnInit(): void {
        this.statusCopies = this.resourceService.getStatus;
        this.locations = this.resourceService.locations;
    }

      onRowEditInit(copy: Copy) {
        copy.registrationDate = new Date (copy.registrationDate);
        if (copy.dismissalDate){
          copy.dismissalDate = new Date (copy.dismissalDate);
        }
        this.clonedCopies[copy.id!] = { ...copy };
       }

      onRowEditSave(copy: Copy) {
          this.updateCopy(copy);
      }

      onRowEditCancel(copy: Copy, index: number) {
          this.copies[index] = this.clonedCopies[copy.id!];
          delete this.clonedCopies[copy.id!];
      }

      updateCopy (copy: Copy){
        this.resourceService.updateCopy(copy).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'Las copias no se han podido cargar. Intente más tarde'}),
          complete: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'La copia se ha actualizado' })
        });
      }

}
