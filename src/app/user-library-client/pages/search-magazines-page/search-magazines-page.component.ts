import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user-management/interface/User.interface';

@Component({
  selector: 'app-search-magazines-page',
  templateUrl: './search-magazines-page.component.html',
})
export class SearchMagazinesPageComponent implements OnInit{

  public user!:User;

  ngOnInit(): void {
    this.user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);
  }
}
