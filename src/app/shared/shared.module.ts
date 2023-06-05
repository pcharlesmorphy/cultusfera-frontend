import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarLibrarianPageComponent } from './components/layouts/bar-menu-librarian/menubar-librarian-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { MenubarAdminPageComponent } from './components/layouts/menubar-admin-page/menubar-admin-page.component';
import { MenubarUserPageComponent } from './components/layouts/menubar-user-page/menubar-user-page.component';
import { ViewBookPageComponent } from './components/pages/view-book-page/view-book-page.component';
import { ViewMoviePageComponent } from './components/pages/view-movie-page/view-movie-page.component';
import { ViewAlbumPageComponent } from './components/pages/view-album-page/view-album-page.component';
import { ViewMagazinePageComponent } from './components/pages/view-magazine-page/view-magazine-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MenuBarLibrarianPageComponent,
    MenubarAdminPageComponent,
    MenubarUserPageComponent,
    ViewBookPageComponent,
    ViewMagazinePageComponent,
    ViewAlbumPageComponent,
    ViewMoviePageComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule
  ],
  exports:[]
})
export class SharedModule { }
