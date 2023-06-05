import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewBookPageComponent } from './books-management/pages/new-book-page/new-book-page.component';
import { SearchBookPageComponent } from './books-management/pages/search-book-page/search-book-page.component';
import { ListingBooksPageComponent } from './books-management/pages/listing-books-page/listing-books.component';
import { NewMoviePageComponent } from './movies-management/pages/new-movie-page/new-movie-page.component';
import { ListingMoviesPageComponent } from './movies-management/pages/listing-movies-page/listing-movies-page.component';
import { SearchMoviePageComponent } from './movies-management/pages/search-movie-page/search-movie-page.component';
import { NewAlbumPageComponent } from './albums-management/pages/new-album-page/new-album-page.component';
import { ListingAlbumsPageComponent } from './albums-management/pages/listing-albums-page/listing-albums-page.component';
import { SearchAlbumPageComponent } from './albums-management/pages/search-album-page/search-album-page.component';
import { NewMagazinePageComponent } from './magazines-management/pages/new-magazine-page/new-magazine-page.component';
import { ListingMagazinesPageComponent } from './magazines-management/pages/listing-magazines-page/listing-magazines-page.component';
import { SearchMagazinePageComponent } from './magazines-management/pages/search-magazine-page/search-magazine-page.component';
import { NewWriterPageComponent } from './books-management/pages/new-writer-page/new-writer-page.component';
import { ListingWritersPageComponent } from './books-management/pages/listing-writers-page/listing-writers-page.component';
import { NewBookPublisherPageComponent } from './books-management/pages/new-book-publisher-page/new-book-publisher-page.component';
import { ListingBookPublishersPageComponent } from './books-management/pages/listing-book-publishers-page/listing-book-publishers-page.component';
import { NewMagazinePublisherPageComponent } from './magazines-management/pages/new-magazine-publisher-page/new-magazine-publisher-page.component';
import { ListingMagazinePublishersPageComponent } from './magazines-management/pages/listing-magazine-publishers-page/listing-magazine-publishers-page.component';
import { NewDirectorPageComponent } from './movies-management/pages/new-director-page/new-director-page.component';
import { ListingDirectorsPageComponent } from './movies-management/pages/listing-directors-page/listing-directors-page.component';
import { NewActorPageComponent } from './movies-management/pages/new-actor-page/new-actor-page.component';
import { ListingActorsPageComponent } from './movies-management/pages/listing-actors-page/listing-actors-page.component';
import { NewMusicianPageComponent } from './albums-management/pages/new-musician-page/new-musician-page.component';
import { ListingMusiciansPageComponent } from './albums-management/pages/listing-musicians-page/listing-musicians-page.component';
import { NewRecordCompanyPageComponent } from './albums-management/pages/new-record-company-page/new-record-company-page.component';
import { ListingRecordCompaniesPageComponent } from './albums-management/pages/listing-record-companies-page/listing-record-companies-page.component';
import { MenuBarLibrarianPageComponent } from '../shared/components/layouts/bar-menu-librarian/menubar-librarian-page.component';
import { ViewBookPageComponent } from '../shared/components/pages/view-book-page/view-book-page.component';
import { ViewMoviePageComponent } from '../shared/components/pages/view-movie-page/view-movie-page.component';
import { ViewAlbumPageComponent } from '../shared/components/pages/view-album-page/view-album-page.component';
import { ViewMagazinePageComponent } from '../shared/components/pages/view-magazine-page/view-magazine-page.component';
import { HasRoleGuard } from '../auth/guards/has-role.guard';

// localhost:4200/gestion-recursos

const routes: Routes = [
  {
    path:'',
    canActivate:[HasRoleGuard],
    data:{
      allowedRoles:'Librarian'
    },
    component:MenuBarLibrarianPageComponent,
    children: [
      { path:'libros', children: [
        {path:'crear',component:NewBookPageComponent},
        {path:'editar',component:NewBookPageComponent},
        {path:'buscar',component:SearchBookPageComponent},
        {path:'listar',component:ListingBooksPageComponent},
        {path:'ver',component:ViewBookPageComponent},
        {path:'escritores/crear',component:NewWriterPageComponent},
        {path:'escritores/editar',component:NewWriterPageComponent},
        {path:'escritores/listar',component:ListingWritersPageComponent},
        {path:'editoriales/crear',component: NewBookPublisherPageComponent},
        {path:'editoriales/editar',component: NewBookPublisherPageComponent},
        {path:'editoriales/listar',component: ListingBookPublishersPageComponent },

      ] },
      {
        path:'peliculas', children: [
          {path:'crear',component:NewMoviePageComponent},
          {path:'editar',component:NewMoviePageComponent},
          {path:'buscar',component:SearchMoviePageComponent},
          {path:'listar',component:ListingMoviesPageComponent},
          {path:'ver',component:ViewMoviePageComponent},
          {path:'directores/crear',component:NewDirectorPageComponent},
          {path:'directores/editar',component:NewDirectorPageComponent},
          {path:'directores/listar',component:ListingDirectorsPageComponent},
          {path:'actores/crear',component: NewActorPageComponent},
          {path:'actores/editar',component: NewActorPageComponent},
          {path:'actores/listar',component: ListingActorsPageComponent },
        ]
      },
      {
        path:'albumes', children: [
          {path:'crear',component:NewAlbumPageComponent},
          {path:'editar',component:NewAlbumPageComponent},
          {path:'buscar',component:SearchAlbumPageComponent},
          {path:'listar',component:ListingAlbumsPageComponent},
          {path:'ver',component:ViewAlbumPageComponent},
          {path:'musicos/crear',component: NewMusicianPageComponent},
          {path:'musicos/editar',component: NewMusicianPageComponent},
          {path:'musicos/listar',component: ListingMusiciansPageComponent},
          {path:'discograficas/crear',component: NewRecordCompanyPageComponent},
          {path:'discograficas/editar',component: NewRecordCompanyPageComponent},
          {path:'discograficas/listar',component: ListingRecordCompaniesPageComponent },
        ]
      },
      {
        path:'revistas', children: [
          {path:'crear',component:NewMagazinePageComponent},
          {path:'editar',component:NewMagazinePageComponent},
          {path:'buscar',component:SearchMagazinePageComponent},
          {path:'listar',component:ListingMagazinesPageComponent},
          {path:'ver',component:ViewMagazinePageComponent},
          {path:'editoriales/crear',component: NewMagazinePublisherPageComponent },
          {path:'editoriales/editar',component: NewMagazinePublisherPageComponent },
          {path:'editoriales/listar',component: ListingMagazinePublishersPageComponent },
        ]
      },
      { path:'**',redirectTo:'libros'},
      { path:'',redirectTo:'libros',pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceManagementRoutingModule { }
