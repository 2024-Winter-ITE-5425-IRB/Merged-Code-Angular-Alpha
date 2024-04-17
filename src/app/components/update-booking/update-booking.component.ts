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
  selector: 'app-update-booking',
  standalone: true,
  imports: [FormsModule,NgClass,ReactiveFormsModule,CommonModule,NgIf,HttpClientModule],
  templateUrl: './update-booking.component.html',
  styleUrl: './update-booking.component.css'
})
export class UpdateBookingComponent {

  formData = {
    bookingId: '',
    roomId: '',
    userId: '',
    startDate: '',
    endDate: '',
    numberOfGuests: '',
    bookingStatus: 'confirmed'
  };
  message: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  async handleSubmit() {
    try {
      const response: any = await this.http.put(`http://localhost:8080/roomBooking/bookings/${this.formData.bookingId}`, this.formData).toPromise();
      if (response && response.message) {
        this.message = response.message;
        if (response.message === 'Booking updated successfully') {
            this.resetForm();
        }
      } else {
        this.message = 'Failed to update booking';
      }
    } catch (error:any) {
    console.error('Error updating booking:', error.error.message);
    this.message = error.error.message;
    }
  }

  resetForm() {
    this.formData = {
      bookingId: '',
      roomId: '',
      userId: '',
      startDate: '',
      endDate: '',
      numberOfGuests: '',
      bookingStatus: 'confirmed'
    };
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
