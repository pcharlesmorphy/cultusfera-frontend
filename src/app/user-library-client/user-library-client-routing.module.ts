import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenubarUserPageComponent } from '../shared/components/layouts/menubar-user-page/menubar-user-page.component';
import { HistoricByUserPageComponent } from './pages/historic-by-user-page/historic-by-user-page.component';
import { ActiveUserLoansPageComponent } from './pages/active-user-loans-page/active-user-loans-page.component';
import { SearchBooksPageComponent } from './pages/search-books-page/search-books-page.component';
import { SearchAlbumsPageComponent } from './pages/search-albums-page/search-albums-page.component';
import { SearchMagazinesPageComponent } from './pages/search-magazines-page/search-magazines-page.component';
import { SearchMoviesPageComponent } from './pages/search-movies-page/search-movies-page.component';
import { ViewBookPageComponent } from '../shared/components/pages/view-book-page/view-book-page.component';
import { ViewMoviePageComponent } from '../shared/components/pages/view-movie-page/view-movie-page.component';
import { ViewAlbumPageComponent } from '../shared/components/pages/view-album-page/view-album-page.component';
import { ViewMagazinePageComponent } from '../shared/components/pages/view-magazine-page/view-magazine-page.component';
import { PostReviewPageComponent } from './pages/post-review-page/post-review-page.component';
import { ViewUserReviewsComponent } from './pages/view-user-reviews/view-user-reviews.component';
import { ActiveUserBookingsPageComponent } from './pages/active-user-bookings-page/active-user-bookings-page.component';
import { OptionsUserPageComponent } from './pages/options-user-page/options-user-page.component';



const routes: Routes = [
  { path: '',
    component: MenubarUserPageComponent,
    children: [
      //{ path:'por-recurso', component:HistoricByResourcePageComponent},
      { path:'historico-por-usuario', component:HistoricByUserPageComponent },
      { path:'prestamos-usuario',component:ActiveUserLoansPageComponent},
      { path:'reservas-usuario',component:ActiveUserBookingsPageComponent},
      { path:'buscar-recursos', children:
        [     {path:'buscar-libros',component: SearchBooksPageComponent},
              {path:'buscar-peliculas',component: SearchMoviesPageComponent},
              {path:'buscar-albumes',component: SearchAlbumsPageComponent},
              {path:'buscar-revistas',component: SearchMagazinesPageComponent}

        ]
      },
      { path:'ficha-libro', component: ViewBookPageComponent},
      { path:'ficha-pelicula', component: ViewMoviePageComponent},
      { path:'ficha-album', component: ViewAlbumPageComponent},
      { path:'ficha-revista', component: ViewMagazinePageComponent},
      { path:'nueva-review', component: PostReviewPageComponent},
      { path:'ver-reviews',component:ViewUserReviewsComponent},
      { path:'opciones',component:OptionsUserPageComponent}
    ],
  },
  { path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLibraryClientRoutingModule { }



