import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-view-booking',
  standalone: true,
  imports: [FormsModule,NgClass,ReactiveFormsModule,CommonModule,NgIf,HttpClientModule],
  templateUrl: './view-booking.component.html',
  styleUrl: './view-booking.component.css'
})
export class ViewBookingComponent {

  bookingId: string='';
  booking: any;
  loading: boolean = false;
  message: string = '';

  constructor(private router: Router, private http: HttpClient) {}
  

  searchBooking() {
    if (this.bookingId) {
      this.loading = true;
      this.http.get(`http://localhost:8080/roomBooking/bookings/${this.bookingId}`)
        .subscribe((data: any) => {
          this.booking = data;
          this.loading = false;
          this.message = data.message; // Use the message from the backend response
        }, (error) => {
          console.error('Error fetching booking:', error);
          this.loading = false;
          this.message = error.error.message; // Use the error message from the backend response
        });
    }
  }

  close(){
    this.router.navigate(['/']);
  }

}
