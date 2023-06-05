import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-layout',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

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
        items : [{label: 'Añadir Copia',routerLink:'/gestion-copias/anadir'}

        ]
      },
      {
        label:'Consultar Histórico',
        items : [{label: 'Por Usuario',routerLink:'/gestion-copias/anadir'},
                 {label: 'Por Recurso',routerLink:'/gestion-copias/anadir'}
        ]
      },
      {
        label:'Gestión Préstamos',
        items : [{label:'Realizar Préstamo',routerLink:'/gestion-copias/anadir'}]
      },
      {
        label:'Consultar Recursos',
        items : [{label: 'Buscar',routerLink:'/gestion-copias/anadir'}]
      }
    ]
  }
