import { Component, EventEmitter, OnInit } from '@angular/core';
import { Review } from '../../interfaces/Review.interface';
import { User } from 'src/app/user-management/interface/User.interface';
import { ReviewService } from '../../services/review.service';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DataReviewService } from '../../services/data-review.service';
import { Resource } from 'src/app/shared/interfaces/Resource.interface';

@Component({
  selector: 'app-view-user-reviews',
  templateUrl: './view-user-reviews.component.html',
  styleUrls: ['./view-user-reviews.component.css']
})
export class ViewUserReviewsComponent implements OnInit{
    public reviews:Review[]=[];
    public review!:Review;
    public resource!:Resource
    public user!:User;
    public title:string='Mis reseñas';
    public isVisibleEditReviewModal:boolean = false;

    constructor(
      private reviewService:ReviewService,
      private messageService:MessageService,
      private confirmationService:ConfirmationService,
      private dataReviewService:DataReviewService,

      ){}


    ngOnInit(): void {
      this.user = JSON.parse(window.sessionStorage.getItem('loggedInUser')!);
      this.getReviewsByUser();

    }

    getReviewsByUser () {

      this.reviewService.getReviewsByUser(this.user.id!).subscribe ( (reviews) => {
        this.reviews = reviews;
      });

    }


    onDelete(review:Review){
      this.reviewService.deleteReviewById(review.id!).subscribe({
        error: (error) =>  this.messageService.add({severity:'error',summary:'Error',detail:`La review no se ha podido eliminar. Intente más tarde`}),
        complete: () => this.messageService.add({severity:'success',summary:'Success',detail:`Review eliminada con éxito`})

      });
      this.reviews = this.reviews.filter ( r => r.id !== review.id);
    }

    confirmDelete(review:Review){
      this.confirmationService.confirm({
        message: '¿Estás seguro de que quiere borrar esta review?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.onDelete(review);
        },
        reject: (type:any) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                case ConfirmEventType.CANCEL:
                    this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: `Cancelaste eliminar la review` });
                    break;
            }
        }
      });

    }


    showEditReviewsModal (review:Review){

      this.review = review;
      this.dataReviewService.review = review;
      this.isVisibleEditReviewModal = true;
    }

    handleOnUpdateReview(review:Review){

      this.getReviewsByUser();
      this.isVisibleEditReviewModal=false;
      setTimeout(()=>{
        this.messageService.add({severity:'success',summary:'Success',detail:'Review actualizada con éxito'});
      },2000);


    }
}
