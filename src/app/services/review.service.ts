import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IReview {
    _id:string,
    roomId: string;
    cleanliness: number;
    location: number;
    value: number;
    accuracy: number;
    communication: number;
    checkin: number;
    rating: number,
    comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private url: string = 'http://localhost:8080/reviews';

  constructor(private http: HttpClient) { }

  getReviewsByRoomId(roomId: string): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.url}/${roomId}`);
  }
}
