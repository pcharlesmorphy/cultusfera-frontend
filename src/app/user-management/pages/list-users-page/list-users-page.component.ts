import { Component} from '@angular/core';
import { User, UserRole } from '../../interface/User.interface';
import { MessageService } from 'primeng/api';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-list-users-page',
  templateUrl: './list-users-page.component.html',
  styleUrls: ['./list-users-page.component.css']
})
export class ListUsersPageComponent {

  public users: User[]=[];
  public userRoles: UserRole[]=[];
  public title:string = 'Lista de usuarios';
  public clonedUsers: { [s: number]: User } = {};


  constructor (
    private userService:UserService,
    private messageService: MessageService,

    ) {}


    ngOnInit(): void {
        this.userRoles = this.userService.getUserRoles;
        this.getAllUsers();
    }

    getAllUsers () {
      this.userService.getUsers().subscribe ({
        next: (resp) => {
          this.users = resp;
       }
      });
    }

    onRowEditInit(user: User) {
        this.clonedUsers[user.id!] = { ...user };
     }

    onRowEditSave(user: User) {
        this.updateCopy(user);
    }

    onRowEditCancel(user: User, index: number) {
        this.users[index] = this.clonedUsers[user.id!];
        delete this.clonedUsers[user.id!];
    }

    updateCopy (user: User){
      this.userService.updateUser(user).subscribe ({
        error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'Los usuarios no se han podido cargar. Intente más tarde'}),
        complete: () => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'El usuario ha sido actualizado' })
      });
    }

}
