import { Component, EventEmitter } from '@angular/core';
import { User } from 'src/app/user-management/interface/User.interface';
import { UserService } from 'src/app/user-management/service/user.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PenaltyService } from '../../services/penalty.service';
import { Penalty } from '../../interfaces/penalty.interface';

@Component({
  selector: 'app-list-user-page',
  templateUrl: './list-user-page.component.html',
  styleUrls: ['./list-user-page.component.css']
})
export class ListUserPageComponent {

  public users: User[]=[];
  public selectedUser!:User;
  public title:string = 'Lista de usuarios';
  public loading:boolean = true;
  public isVisibleNewPenaltyModal:boolean=false;
  public isVisiblePenaltiesModal:boolean=false;
  public penalties!:Penalty[];
  public clonedUsers: { [s: number]: User } = {};
  public onUserUpdate: EventEmitter<void>=new EventEmitter<void>;


  constructor (
    private userService:UserService,
    private penaltyService: PenaltyService,
    private messageService: MessageService,

    ) {}


    ngOnInit(): void {
        this.getClientUsers();
        this.onUserUpdate.subscribe(()=>{
          this.handleUserUpdate();
        })
    }

    getClientUsers () {
      this.userService.getClientUsers().subscribe ({
        next: (resp) => {
          this.users = resp;
        }
      });
    }

    getUserPenalties (idUser:number) {
      this.penaltyService.getAllUserPenalties(idUser).subscribe ({
        next: (value) =>{
          if(value.length === 0){
            this.messageService.add({severity:'info',summary:'Info',detail:'El Usuario no tiene sanciones'});
            this.penalties=[];
            return;
          }
          this.penalties = value;
          console.log(this.penalties);
        },
        error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'Las penalizaciones no se han podido cargar. Intente más tarde'}),

      })
    }

    clear(table: Table) {
      table.clear();
    }


    showNewPenaltyModal(user:User){
      this.selectedUser = user;
      this.isVisibleNewPenaltyModal = true;
    }

    showCopiesModal (idUser:number){
      this.getUserPenalties(idUser);
      this.isVisiblePenaltiesModal = true;
    }

    handleUserUpdate(){
      this.isVisibleNewPenaltyModal=false;
      this.getClientUsers();
    }


}
