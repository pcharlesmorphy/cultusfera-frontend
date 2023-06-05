import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user-management/interface/User.interface';

@Component({
  selector: 'app-search-movies-page',
  templateUrl: './search-movies-page.component.html',
})
export class SearchMoviesPageComponent implements OnInit {

  public user!:User;

  ngOnInit(): void {
    this.user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);
  }


}
