import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/user-management/interface/User.interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-menubar-admin-page',
  templateUrl: './menubar-admin-page.component.html',
})
export class MenubarAdminPageComponent {

  public user:User = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);

  constructor (
    private authService:AuthService,
    private router:Router
  ) {}

  items:MenuItem[] = [
    {
        label: 'Gestión Usuarios',
        items: [
            {label: 'Nuevo Usuario',routerLink:'/gestion-usuarios/usuarios/crear'},
            {label: 'Listar Usuarios',routerLink:'/gestion-usuarios/usuarios/listar'}
        ]

      }
  ];

  splitItems: MenuItem[] = [
    {
       label:'Opciones',
       icon:'pi pi-cog'
    },
    { separator:true },
    {
        label:'Cerrar Sesión',
        icon:'pi pi-sign-out',
        command: () =>{
          this.logout();
        }
    }

  ];

  logout(){
    window.sessionStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
