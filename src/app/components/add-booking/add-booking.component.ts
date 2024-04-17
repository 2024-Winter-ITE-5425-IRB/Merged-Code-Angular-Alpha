import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-add-booking',
  standalone: true,
  imports: [FormsModule,NgClass,ReactiveFormsModule,CommonModule,NgIf,HttpClientModule],
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.css'
})
export class AddBookingComponent {
  
  formData = {
    roomId: '',
    userId: '',
    startDate: '',
    endDate: '',
    numberOfGuests: ''
  };
  message: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    const bookingData = {
      roomId: this.formData.roomId,
      userId: this.formData.userId,
      startDate: this.formData.startDate,
      endDate: this.formData.endDate,
      numberOfGuests: this.formData.numberOfGuests
    };

    this.http.post('http://localhost:8080/roomBooking/bookings', bookingData)
    .subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        this.message = response.message; // Assign the response message to the component's message property
      },
      (error: any) => {
        console.error('Error during POST request', error);
        if (error.error && error.error.message) {
          this.message = error.error.message; // If server returns a custom error message, use it
        } else {
          this.message = 'An error occurred. Please try again.'; // Fallback error message
        }
      }
    );
  }

  close(){
    this.router.navigate(['/']);
  }

  isFormValid(): boolean {
    return (
      !!this.formData.roomId &&
      !!this.formData.userId &&
      !!this.formData.startDate &&
      !!this.formData.endDate &&
      !!this.formData.numberOfGuests
    );
  }

}

