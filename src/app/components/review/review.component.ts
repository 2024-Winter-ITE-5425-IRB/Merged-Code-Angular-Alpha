import { Component } from '@angular/core';
import { IReview, ReviewService } from '../../services/review.service';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  reviews: IReview[] = [];
 
  constructor(private _reviewService: ReviewService, private route: ActivatedRoute,private http: HttpClient) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.params['roomId'];
   
    if (roomId) {
      this._reviewService.getReviewsByRoomId(roomId).subscribe((data) => {
        this.reviews = data;
      });
    }
  }

  ReviewForm = new FormGroup({
    cleanliness: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    location: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    value: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    accuracy: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    communication: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    checkIn: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    comment: new FormControl('')
  });


  onSubmit2() {
    if (this.ReviewForm.valid) {
      const roomId = this.route.snapshot.params['roomId'];
      const formData = {
        roomId: roomId,
        cleanlinessRating: +this.ReviewForm.value.cleanliness!!, 
        locationRating: +this.ReviewForm.value.location!,
        valueRating: +this.ReviewForm.value.value!,
        accuracyRating: +this.ReviewForm.value.accuracy!,
        communicationRating: +this.ReviewForm.value.communication!,
        checkInRating: +this.ReviewForm.value.checkIn!,
        comment: this.ReviewForm.value.comment!,
      };

      this.http.post('http://localhost:8080/reviews', formData)
        .subscribe((response) => {
          console.log('Review added successfully');
          this.refreshReviews();
        }, (error) => {
          console.error('Error occurred while adding review:', error);
        });

      this.ReviewForm.reset();
    }
  }

  private refreshReviews() {
    const roomId = this.route.snapshot.params['roomId'];
    if (roomId) {
      this._reviewService.getReviewsByRoomId(roomId).subscribe((data) => {
        this.reviews = data;
      });
    }
  }
}