import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user-management/interface/User.interface';

@Component({
  selector: 'app-search-books-page',
  templateUrl: './search-books-page.component.html'
})
export class SearchBooksPageComponent implements OnInit {
  public user!: User;

  ngOnInit(): void {
    this.user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);
  }
}
