import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { ViewBookingComponent } from './components/view-booking/view-booking.component';
import { UpdateBookingComponent } from './components/update-booking/update-booking.component';
import { DeleteBookingComponent } from './components/delete-booking/delete-booking.component';
import { FaqComponent } from './components/faq/faq.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavigationBarComponent,
    AddBookingComponent,
    ViewBookingComponent,
    UpdateBookingComponent,
    DeleteBookingComponent,
    FaqComponent,
    FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'roomBooking';

}
