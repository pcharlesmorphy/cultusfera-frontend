
import { Component, Input } from '@angular/core';
import { Review } from '../../interfaces/Review.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/user-management/interface/User.interface';
import { Resource } from 'src/app/shared/interfaces/Resource.interface';
import { DataResourceService } from 'src/app/shared/services/data-resource.service';


@Component({
  selector: 'app-post-review-page',
  templateUrl: './post-review-page.component.html',
  styleUrls: ['./post-review-page.component.css']
})
export class PostReviewPageComponent {

  public review!: Review;
  public user!:User;
  public resource!:Resource;
  public newReviewForm!: FormGroup;
  public title:string = 'Nueva Review';


  public todayDate:Date = new Date(Date.now());


  constructor (
    private fb:FormBuilder,
    private reviewService:ReviewService,
    private messageService:MessageService,
    private dataResourceService:DataResourceService) {}


  ngOnInit(): void {

    this.user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);

    this.resource = this.dataResourceService.getResource;
    console.log("Recurso",this.resource.id);
    console.log("User", this.user.id);
    this.newReviewForm = this.fb.group ({
      title:[''],
      date:[this.todayDate.toISOString().split('T')[0]],
      comment:[''],
      rating:[5]

    });

  }


  saveReview(){
      this.formToReview();
      this.reviewService.addReview(this.review).subscribe ({
        error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'La valoración no se podido añadir. Intente más tarde'}),
        complete: () => {
          this.messageService.add({severity:'success',summary:'Success',detail:'Valoración añadida con éxito'});
          this.newReviewForm.reset();
        }
      });
  }


  formToReview ():void{

    const bookFormValues = this.newReviewForm.value;

    this.review = {
      date:bookFormValues.date,
      title:bookFormValues.title,
      comment:bookFormValues.comment,
      rating:bookFormValues.rating,
      resourceId:this.resource.id!,
      userId:this.user.id!,
    }

    console.log(this.review);

  }


    resetForm ():void {
      this.newReviewForm.reset();
    }

}
