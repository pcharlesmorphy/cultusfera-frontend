import { Injectable } from '@angular/core';
import { Resource } from '../interfaces/Resource.interface';

@Injectable({
  providedIn: 'root'
})
export class DataResourceService {

  public resource:Resource = {
        id:0,
        title:'',
        publishedYear:0,
        copies:[],
        reviews:[],
        type:''
  };

  set setResource(resource:Resource){
    this.resource = resource;
  }

  get getResource(){
    return this.resource;
  }
}




