import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Review } from '../../interfaces/Review.interface';
import { User } from 'src/app/user-management/interface/User.interface';
import { Resource } from 'src/app/shared/interfaces/Resource.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { MessageService } from 'primeng/api';
import { DataResourceService } from 'src/app/shared/services/data-resource.service';
import { DataReviewService } from '../../services/data-review.service';


@Component({
  selector: 'app-edit-review-page',
  templateUrl: './edit-review-page.component.html',
  styleUrls: ['./edit-review-page.component.css']
})
export class EditReviewPageComponent implements OnInit{
  public review!: Review;
  public user!:User;
  public resource!:Resource;
  public newReviewForm!: FormGroup;
  public title:string = 'Editar Review';
  @Output() onUpdateReview:EventEmitter  <Review> = new EventEmitter<Review>();


  constructor (
    private fb:FormBuilder,
    private reviewService:ReviewService,
    private messageService:MessageService,
    private dataResourceService:DataResourceService,
    private dataReviewService:DataReviewService) {

    }


      ngOnInit(): void {
        this.review = this.dataReviewService.review;
        this.user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);



        this.newReviewForm = this.fb.group ({
          title:[''],
          date:[''],
          comment:[''],
          rating:[0]
        });


        this.initForm();
      }


    updateReview(){
      this.formToReview();
      this.reviewService.updateReview(this.review).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'La review no se ha podido añadir. Intente más tarde'}),
          complete: () => {
              this.messageService.add({severity:'success',summary:'Success',detail:'Review actualizada con éxito'});
              this.onUpdateReview.emit(this.review);
              this.newReviewForm.reset();

        }
      });
    }

  initForm (){
    this.newReviewForm.setValue({
      title:this.review.title,
      date:this.review.date,
      comment:this.review.comment,
      rating:this.review.rating
  });
  }

  formToReview ():void{

    const reviewFormValues = this.newReviewForm.value;

    this.review = {
      id:this.review.id,
      date:reviewFormValues.date,
      title:reviewFormValues.title,
      comment:reviewFormValues.comment,
      rating:reviewFormValues.rating,
      resourceId:this.review.resourceId,
      userId:this.user.id!,
    }

  }


    resetForm ():void {
      this.newReviewForm.reset();
    }
}
