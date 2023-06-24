import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/user-management/interface/User.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './menubar-librarian-page.component.html',
  styles: [
  ]
})
export class MenuBarLibrarianPageComponent {
  public user:User = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);

  constructor (
    private authService:AuthService,
    private router:Router
  ) {}

  items:MenuItem[] = [
    {
        label: 'Gestión Recursos',
        items: [
            {
              label: 'Libros',
              items: [
                      {label: 'Nuevo Libro', routerLink:'/gestion-recursos/libros/crear'},
                      {label: 'Buscar Libro',routerLink:'/gestion-recursos/libros/buscar'},
                      {label: 'Listar Libros',routerLink:'/gestion-recursos/libros/listar'},
                      {label: 'Escritores', items: [
                        {label: 'Nuevo Escritor', routerLink:'/gestion-recursos/libros/escritores/crear'},
                        {label: 'Listar Escritores', routerLink:'/gestion-recursos/libros/escritores/listar'},
                      ]},
                      {label: 'Editoriales', items: [
                        {label: 'Nueva Editorial',routerLink:'/gestion-recursos/libros/editoriales/crear'},
                        {label: 'Listar Editoriales',routerLink:'/gestion-recursos/libros/editoriales/listar'},
                      ]},

                    ]
            },
            {
              label: 'Albumes',
              items: [
                      {label: 'Nuevo Álbum',routerLink:'/gestion-recursos/albumes/crear'},
                      {label: 'Buscar Álbum',routerLink:'/gestion-recursos/albumes/buscar'},
                      {label: 'Listar Álbumes',routerLink:'/gestion-recursos/albumes/listar'},
                      {label: 'Musicos', items: [
                        {label: 'Nuevo Músico', routerLink:'/gestion-recursos/albumes/musicos/crear'},
                        {label: 'Listar Músicos', routerLink:'/gestion-recursos/albumes/musicos/listar'},
                      ]},
                      {label: 'Discográficas', items: [
                        {label: 'Nueva Discográfica',routerLink:'/gestion-recursos/albumes/discograficas/crear'},
                        {label: 'Listar Discograficas',routerLink:'/gestion-recursos/albumes/discograficas/listar'},
                      ]},

                    ]
            },
            {
              label: 'Peliculas',
              items: [{label: 'Nueva Película',routerLink:'/gestion-recursos/peliculas/crear'},
                      {label: 'Buscar Película',routerLink:'/gestion-recursos/peliculas/buscar'},
                      {label: 'Listar Películas',routerLink:'/gestion-recursos/peliculas/listar'},
                      {label: 'Directores', items: [
                        {label: 'Nuevo Director', routerLink:'/gestion-recursos/peliculas/directores/crear'},
                        {label: 'Listar Directores', routerLink:'/gestion-recursos/peliculas/directores/listar'},
                      ]},
                      {label: 'Actores', items: [
                        {label: 'Nuevo Actor',routerLink:'/gestion-recursos/peliculas/actores/crear'},
                        {label: 'Listar Actores',routerLink:'/gestion-recursos/peliculas/actores/listar'},
                      ]},



                    ]
            },
            {
              label: 'Revistas',
              items: [{label: 'Nueva Revista',routerLink:'/gestion-recursos/revistas/crear'},
                      {label: 'Buscar Revista',routerLink:'/gestion-recursos/revistas/buscar'},
                      {label: 'Listar Revistas',routerLink:'/gestion-recursos/revistas/listar'},
                      {label: 'Editoriales', items: [
                          {label: 'Nueva Editorial',routerLink:'/gestion-recursos/revistas/editoriales/crear'},
                          {label: 'Listar Editoriales',routerLink:'/gestion-recursos/revistas/editoriales/listar'},
                      ]}
                    ]
            },
        ]
      },
      {
        label:'Gestión Copias',
        items : [{label: 'Añadir Copia',routerLink:'/gestion-copias/copias/anadir'}

        ]
      },
      {
        label:'Consultar Histórico',
        items : [{label: 'Por Usuario',routerLink:'/historico/por-usuario'},
                 {label: 'Por Recurso',routerLink:'/historico/por-recurso'}
        ]
      },
      {
        label:'Gestión Transacciones',
        items : [{label:'Realizar Transacción',routerLink:'/gestion-transacciones'}]
      },
      {
        label:'Gestión Sanciones',
        items : [{label:'Listar Usuarios',routerLink:'/gestion-sanciones/usuarios/listar'}]
      },
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
          command: () => {
            this.logout();
          }
      }

    ];

    logout(){
      window.sessionStorage.removeItem('loggedInUser');
      this.router.navigate(['/login']);
    }
  }
