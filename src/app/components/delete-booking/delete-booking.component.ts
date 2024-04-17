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
  selector: 'app-delete-booking',
  standalone: true,
  imports: [FormsModule,NgClass,ReactiveFormsModule,CommonModule,NgIf,HttpClientModule],
  templateUrl: './delete-booking.component.html',
  styleUrl: './delete-booking.component.css'
})
export class DeleteBookingComponent {
  formData = {
    bookingId: ''
  };

  bookingId: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  async handleDelete() {
    try {
      const response: any = await this.http.delete(`http://localhost:8080/roomBooking/bookings/${this.bookingId}`).toPromise();
      if (response && response.message) {
        console.log('Booking successfully deleted:', response.message);
        this.errorMessage = response.message;
      } else {
        console.error('Failed to delete booking.');
        this.errorMessage = 'Failed to delete booking.';
      }
    } catch (error:any) {
      console.error('Error occurred while deleting booking:', error.error.message);
      this.errorMessage = error.error.message || 'Error occurred while deleting booking.';
    }
  }

  close(){
    this.router.navigate(['/']);
  }

  isFormValid(): boolean {
    return (
      !!this.formData.bookingId
    );
  }

}
