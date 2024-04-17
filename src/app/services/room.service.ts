import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IRoom {
            _id:string,
            roomNumber: number,
            roomName: string,
            description: string,
            location: string,
            rate: number,
            hotelName: string,
            roomImage: string,
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private url: string = 'http://localhost:8080/room';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<IRoom[]> {
    return this.http.get<IRoom[]>(this.url);
  }
}
