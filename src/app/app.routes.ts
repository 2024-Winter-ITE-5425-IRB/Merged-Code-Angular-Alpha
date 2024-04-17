import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { AppComponent } from './app.component';
import { ViewBookingComponent } from './components/view-booking/view-booking.component';
import { UpdateBookingComponent } from './components/update-booking/update-booking.component';
import { DeleteBookingComponent } from './components/delete-booking/delete-booking.component';
import { FaqComponent } from './components/faq/faq.component';
import { ReviewComponent } from './components/review/review.component';
import { RoomComponent } from './components/room/room.component';

export const routes: Routes = [
  { path: '', component: RoomComponent }, 
  { path: 'bookaroom', component: AddBookingComponent },
  { path: 'viewbooking', component: ViewBookingComponent },
  { path: 'updatebooking', component: UpdateBookingComponent },
  { path: 'deletebooking', component: DeleteBookingComponent },
  { path: 'faq', component: FaqComponent},
  { path: 'room', component: RoomComponent},
  {
    path: 'review/:roomId',
    component: ReviewComponent,
},

  // add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouteComponent {}
