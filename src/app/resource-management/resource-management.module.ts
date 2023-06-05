import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResourceManagementRoutingModule } from './resource-management-routing.module';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { LayoutPageComponent } from './pages/layout/layout-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewBookPageComponent } from './books-management/pages/new-book-page/new-book-page.component';
import { SearchBookPageComponent } from './books-management/pages/search-book-page/search-book-page.component';
import { ListingBooksPageComponent } from './books-management/pages/listing-books-page/listing-books.component';
import { BooksTableComponent } from './books-management/shared/components/books-table/books-table.component';
import { MatIconModule } from '@angular/material/icon';
import { NewMoviePageComponent } from './movies-management/pages/new-movie-page/new-movie-page.component';
import { SearchMoviePageComponent } from './movies-management/pages/search-movie-page/search-movie-page.component';
import { MoviesTableComponent } from './movies-management/shared/movies-table/movies-table.component';
import { ListingMoviesPageComponent } from './movies-management/pages/listing-movies-page/listing-movies-page.component';
import { NewAlbumPageComponent } from './albums-management/pages/new-album-page/new-album-page.component';
import { ListingAlbumsPageComponent } from './albums-management/pages/listing-albums-page/listing-albums-page.component';
import { AlbumsTableComponent } from './albums-management/shared/albums-table/albums-table.component';
import { SearchAlbumPageComponent } from './albums-management/pages/search-album-page/search-album-page.component';
import { NewMagazinePageComponent } from './magazines-management/pages/new-magazine-page/new-magazine-page.component';
import { ListingMagazinesPageComponent } from './magazines-management/pages/listing-magazines-page/listing-magazines-page.component';
import { MagazinesTableComponent } from './magazines-management/shared/magazines-table/magazines-table.component';
import { SearchMagazinePageComponent } from './magazines-management/pages/search-magazine-page/search-magazine-page.component';
import { NewWriterPageComponent } from './books-management/pages/new-writer-page/new-writer-page.component';
import { ListingWritersPageComponent } from './books-management/pages/listing-writers-page/listing-writers-page.component';
import { WritersTableComponent } from './books-management/shared/components/writers-table/writers-table.component';
import { NewBookPublisherPageComponent } from './books-management/pages/new-book-publisher-page/new-book-publisher-page.component';
import { BookPublisherTableComponent } from './books-management/shared/components/book-publishers-table/book-publishers-table.component';
import { ListingBookPublishersPageComponent } from './books-management/pages/listing-book-publishers-page/listing-book-publishers-page.component';
import { ListingMagazinePublishersPageComponent } from './magazines-management/pages/listing-magazine-publishers-page/listing-magazine-publishers-page.component';
import { MagazinePublishersTableComponent } from './magazines-management/shared/magazine-publishers-table/magazine-publishers-table.component';
import { ListingActorsPageComponent } from './movies-management/pages/listing-actors-page/listing-actors-page.component';
import { ListingDirectorsPageComponent } from './movies-management/pages/listing-directors-page/listing-directors-page.component';
import { NewDirectorPageComponent } from './movies-management/pages/new-director-page/new-director-page.component';
import { NewActorPageComponent } from './movies-management/pages/new-actor-page/new-actor-page.component';
import { DirectorsTableComponent } from './movies-management/shared/directors-table/directors-table.component';
import { ActorsTableComponent } from './movies-management/shared/actors-table/actors-table.component';
import { NewMusicianPageComponent } from './albums-management/pages/new-musician-page/new-musician-page.component';
import { NewRecordCompanyPageComponent } from './albums-management/pages/new-record-company-page/new-record-company-page.component';
import { ListingMusiciansPageComponent } from './albums-management/pages/listing-musicians-page/listing-musicians-page.component';
import { ListingRecordCompaniesPageComponent } from './albums-management/pages/listing-record-companies-page/listing-record-companies-page.component';
import { MusiciansTableComponent } from './albums-management/shared/musicians-table/musicians-table.component';
import { RecordCompaniesTableComponent } from './albums-management/shared/record-companies-table/record-companies-table.component';
import { SharedModule } from '../shared/shared.module';
import { NewMagazinePublisherPageComponent } from './magazines-management/pages/new-magazine-publisher-page/new-magazine-publisher-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    NewAlbumPageComponent,
    ListingAlbumsPageComponent,
    SearchAlbumPageComponent,
    AlbumsTableComponent,
    ListingBooksPageComponent,
    NewBookPageComponent,
    SearchBookPageComponent,
    BooksTableComponent,
    NewMagazinePageComponent,
    ListingMagazinesPageComponent,
    SearchMagazinePageComponent,
    MagazinesTableComponent,
    NewMoviePageComponent,
    ListingMoviesPageComponent,
    SearchMoviePageComponent,
    MoviesTableComponent,
    NewWriterPageComponent,
    ListingWritersPageComponent,
    WritersTableComponent,
    NewBookPublisherPageComponent,
    BookPublisherTableComponent,
    ListingBookPublishersPageComponent,
    ListingMagazinePublishersPageComponent,
    MagazinePublishersTableComponent,
    ListingActorsPageComponent,
    ListingDirectorsPageComponent,
    NewDirectorPageComponent,
    NewActorPageComponent,
    DirectorsTableComponent,
    ActorsTableComponent,
    NewMusicianPageComponent,
    NewRecordCompanyPageComponent,
    ListingMusiciansPageComponent,
    ListingRecordCompaniesPageComponent,
    MusiciansTableComponent,
    RecordCompaniesTableComponent,
    NewMagazinePublisherPageComponent,

  ],
  imports: [
    CommonModule,
    ResourceManagementRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    PrimeNgModule,
    SharedModule
  ],
  exports: [
    SearchBookPageComponent,
    SearchMoviePageComponent,
    SearchAlbumPageComponent,
    SearchMagazinePageComponent,
    BooksTableComponent,
    MoviesTableComponent,
    AlbumsTableComponent,
    MagazinesTableComponent
  ]
})
export class ResourceManagementModule { }
