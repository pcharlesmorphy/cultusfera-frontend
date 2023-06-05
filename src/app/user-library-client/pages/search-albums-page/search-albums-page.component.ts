import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user-management/interface/User.interface';

@Component({
  selector: 'app-search-albums-page',
  templateUrl: './search-albums-page.component.html',
})
export class SearchAlbumsPageComponent implements OnInit{

  public user!:User;

  ngOnInit(): void {
    this.user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);
  }
}
