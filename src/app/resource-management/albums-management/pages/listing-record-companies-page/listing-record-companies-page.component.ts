import { Component, SimpleChanges } from '@angular/core';
import { RecordCompany } from '../../interfaces/Album.interface';
import { RecordCompanyService } from '../../services/record-company.service';

@Component({
  selector: 'app-listing-record-companies-page',
  templateUrl: './listing-record-companies-page.component.html',
  styleUrls: ['./listing-record-companies-page.component.css']
})
export class ListingRecordCompaniesPageComponent {

  public title:string = 'Listar Discográficas';
  public recordCompanies:RecordCompany[] = [];

  constructor (
    private recordCompanyService:RecordCompanyService ) {}

  ngOnChanges(changes: SimpleChanges ): void {
    this.getRecordCompanies();
  }

  ngOnInit(): void {
    this.getRecordCompanies();
  }

  getRecordCompanies():void{
    this.recordCompanyService.getRecordCompanies().subscribe ({
      next: (resp) => {
         this.recordCompanies = resp;
      }
   });
  }
}
