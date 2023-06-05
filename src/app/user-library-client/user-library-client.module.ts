import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserLibraryClientRoutingModule } from './user-library-client-routing.module';
import { HistoricByUserPageComponent } from './pages/historic-by-user-page/historic-by-user-page.component';
import { HistoricSearchModule } from '../historic-search/historic-search.module';
import { AuthModule } from '../auth/auth.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActiveUserLoansPageComponent } from './pages/active-user-loans-page/active-user-loans-page.component';
import { SearchBooksPageComponent } from './pages/search-books-page/search-books-page.component';
import { SearchMoviesPageComponent } from './pages/search-movies-page/search-movies-page.component';
import { SearchMagazinesPageComponent } from './pages/search-magazines-page/search-magazines-page.component';
import { SearchAlbumsPageComponent } from './pages/search-albums-page/search-albums-page.component';
import { ResourceManagementModule } from '../resource-management/resource-management.module';
import { PostReviewPageComponent } from './pages/post-review-page/post-review-page.component';
import { ViewUserReviewsComponent } from './pages/view-user-reviews/view-user-reviews.component';
import { EditReviewPageComponent } from './pages/edit-review-page/edit-review-page.component';
import { ActiveUserBookingsPageComponent } from './pages/active-user-bookings-page/active-user-bookings-page.component';
import { OptionsUserPageComponent } from './pages/options-user-page/options-user-page.component';
import { ChangeUserPasswordModalPageComponent } from './pages/change-user-password-modal-page/change-user-password-modal-page.component';


@NgModule({
  declarations: [
    HistoricByUserPageComponent,
    ActiveUserLoansPageComponent,
    SearchBooksPageComponent,
    SearchMoviesPageComponent,
    SearchMagazinesPageComponent,
    SearchAlbumsPageComponent,
    PostReviewPageComponent,
    ViewUserReviewsComponent,
    EditReviewPageComponent,
    ActiveUserBookingsPageComponent,
    OptionsUserPageComponent,
    ChangeUserPasswordModalPageComponent
  ],
  imports: [
    CommonModule,
    UserLibraryClientRoutingModule,
    AuthModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    HistoricSearchModule,
    ResourceManagementModule
  ]
})
export class UserLibraryClientModule { }
