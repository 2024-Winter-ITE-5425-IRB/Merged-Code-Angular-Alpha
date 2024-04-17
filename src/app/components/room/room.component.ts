import { Component } from '@angular/core';
import { IRoom, RoomService } from '../../services/room.service';
import { NgFor } from '@angular/common';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [NgForOf, NgFor],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})


export class RoomComponent {
  rooms: IRoom[] = [];

  constructor(private _roomService: RoomService, private router: Router) {}

  ngOnInit(): void {
    this._roomService.getRooms().subscribe((data) => (this.rooms = data));
  }

  
  goToReview(roomId: string): void {
    this.router.navigate(['/review', roomId]);
  }

  goToBookNow(): void {
    this.router.navigate(['/bookaroom']);
  }

}
