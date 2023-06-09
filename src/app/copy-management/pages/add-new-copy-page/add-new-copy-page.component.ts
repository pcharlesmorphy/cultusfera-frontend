import { Component, OnInit, EventEmitter} from '@angular/core';
import { ResourceService } from '../../../resource-management/services/resource.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Resource } from 'src/app/shared/interfaces/Resource.interface';
import { Table } from 'primeng/table';
import { Copy } from '../../interfaces/Copy.interface';



@Component({
  selector: 'app-add-new-copy-page',
  templateUrl: './add-new-copy-page.component.html',
  styleUrls: ['./add-new-copy-page.component.css']
})

export class AddNewCopyPageComponent implements OnInit{
  public resources!: Resource[];
  public selectedResource!:Resource;
  public title:string = 'Añadir Copia';
  public loading: boolean = true;
  public isVisibleNewCopyModal:boolean = false;
  public isVisibleCopiesModal:boolean = false;
  public copies!: Copy[];
  public resource!: Resource;
  public onCopyUpdate: EventEmitter<void>=new EventEmitter<void>;

  constructor (
    private resourceService:ResourceService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService) {}



  ngOnInit(): void {

    this.getResources();
    this.loading = false;
    this.onCopyUpdate.subscribe(()=>{
       this.handleCopyCreation();
    })
  }


  getResources():void{
    this.resourceService.getAllResources().subscribe ({
      next: (resp) => {
         this.resources = resp;
      }
   });
  }

  getAllCopies():void {
    this.resourceService.getAllCopies().subscribe ({
      next: (resp) => {
        this.copies = resp;
     }
    });
  }

  getResourcesCopies (idResource:number) {
    this.resourceService.getResourcesCopies(idResource).subscribe ({
      next: (value) =>{
        if(value.length === 0){
          this.messageService.add({severity:'info',summary:'Info',detail:'El Recurso no tiene copias'});
          this.copies=[];
          return;
        }
        this.copies = value;
        setTimeout(()=>{
          console.log("Lista Copias del Recurso tras clickar el boton del ojo: ", this.copies);
        },2000);

      },
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'Las copias no se han podido cargar. Intente más tarde'}),

    })
  }


  clear(table: Table) {
    table.clear();
  }

  showNewCopyModal(resource:Resource){
    this.selectedResource = resource;

    this.isVisibleNewCopyModal = true;
  }

  showCopiesModal (idResource:number){
    this.getResourcesCopies(idResource);
    this.isVisibleCopiesModal = true;
  }

  /*
  handleCopyUpdate(copy:Copy){
    this.isVisibleCopiesModal=false;
    this.showCopiesModal(copy.resource.id!);
    this.isVisibleCopiesModal=true;
  }*/

  handleCopyCreation(){
      this.isVisibleNewCopyModal=false;
  }

}
