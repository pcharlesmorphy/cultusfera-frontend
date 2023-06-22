import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StatusCopy, Copy } from 'src/app/copy-management/interfaces/Copy.interface';
import { ResourceService } from 'src/app/resource-management/services/resource.service';
import { Penalty } from '../../interfaces/penalty.interface';


@Component({
  selector: 'app-view-user-penalties-modal-page',
  templateUrl: './view-user-penalties-modal-page.component.html',
  styleUrls: ['./view-user-penalties-modal-page.component.css']
})
export class ViewUserPenaltiesModalPageComponent {
  @Input() penalties!: Penalty[];
  public title:string = 'Lista de sanciones';

  constructor (
    private resourceService:ResourceService,
    private messageService: MessageService

    ) {}


  ngOnInit(): void {
      console.log(this.penalties);
  }

}
