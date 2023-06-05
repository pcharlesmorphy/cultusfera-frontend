import { Injectable } from '@angular/core';
import { Review } from '../interfaces/Review.interface';

@Injectable({
  providedIn: 'root'
})
export class DataReviewService {

  public review:Review = {
      id:0,
      date:new Date(),
      title:'',
      comment:'',
      rating: 0,
      resourceId:0,
      userId:0,
      username:'',
    };


  public set setReview(review:Review){
    this.review = review;
  }

  public get getReview(){
    return this.review;
  }

}
