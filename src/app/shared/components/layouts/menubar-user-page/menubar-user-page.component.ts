import { Component } from '@angular/core';
import { User } from 'src/app/user-management/interface/User.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar-user-page',
  templateUrl: './menubar-user-page.component.html',
})
export class MenubarUserPageComponent {
  public user:User = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);

  constructor (
    private authService:AuthService,
    private router:Router
  ) {}

  items:MenuItem[] = [
    {
        label: 'Consultar Histórico',routerLink:'/usuarios-biblioteca/historico-por-usuario'

    },
    {
        label: 'Consultar Préstamos',routerLink:'/usuarios-biblioteca/prestamos-usuario'
    },
    {
      label: 'Consultar Reservas',routerLink:'/usuarios-biblioteca/reservas-usuario'
    },
    {
        label: 'Consultar Reviews' ,routerLink:'/usuarios-biblioteca/ver-reviews'
    },
    {
      label: 'Buscar Recursos',
      items: [  {label:'Buscar Libro',routerLink:'/usuarios-biblioteca/buscar-recursos/buscar-libros'},
                {label:'Buscar Película',routerLink:'/usuarios-biblioteca/buscar-recursos/buscar-peliculas'},
                {label:'Buscar Album',routerLink:'/usuarios-biblioteca/buscar-recursos/buscar-albumes'},
                {label:'Buscar Revista',routerLink:'/usuarios-biblioteca/buscar-recursos/buscar-revistas'}
      ]
    },
  ];

  splitItems: MenuItem[] = [
    {
       label:'Opciones',
       icon:'pi pi-cog',
       routerLink:'/usuarios-biblioteca/opciones'
    },
    { separator:true },
    {
        label:'Logout',
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
