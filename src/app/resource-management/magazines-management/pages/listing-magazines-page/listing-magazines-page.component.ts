import { Component } from '@angular/core';
import { Magazine } from '../../interfaces/Magazine.interface';
import { MagazineService } from '../../services/magazine.service';
import { SimpleChanges } from '@angular/core';
import { User } from 'src/app/user-management/interface/User.interface';

@Component({
  selector: 'app-listing-magazines-page',
  templateUrl: './listing-magazines-page.component.html',
  styleUrls: ['./listing-magazines-page.component.css']
})
export class ListingMagazinesPageComponent {
  public title:string = 'Listar Revistas';
  public magazines:Magazine[] = [];
  public user!:User;

  constructor (
    private magazineService:MagazineService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getMagazines();
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('loggedInUser')!);
    this.getMagazines();
  }

  getMagazines():void{
    this.magazineService.getMagazines().subscribe ({
      next: (resp) => {
         this.magazines = resp;
      }
   });
  }
}
