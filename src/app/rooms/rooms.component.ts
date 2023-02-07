import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { Room, RoomList } from './rooms';
import { RoomsService } from './rooms-list/services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, AfterViewInit {
  hotelName = 'India Gate';
  hideRoom = true;
  numberOfRooms = 10;

  @ViewChild(HeaderComponent, { static: true })
  headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  rooms: Room = {
    availableRooms: 10,
    bookedRooms: 5,
    totalRooms: 20,
  };

  priceFilter = new FormControl(0);

  roomList: RoomList[] = [];
  error$ = new Subject<string>();
  ngOnInit(): void {
    this.roomsService.getRooms().subscribe((rooms) => {
      this.roomList = rooms;
    });
  }
  constructor(private roomsService: RoomsService) {}

  roomsCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));
  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  ngAfterViewInit(): void {
    this.headerComponent.title = 'Hotel New';
  }

  toggle() {
    this.hideRoom = !this.hideRoom;
  }

  selectRoom(room: RoomList) {
    console.log('room', room);
  }
  addRoom() {
    const room: RoomList = {
      roomNumber: '4',
      roomType: 'Suite',
      amenities: 'All',
      price: 20000,
      photos: '',
      checkinTime: new Date(),
      checkoutTime: new Date(),
      rating: 2,
    };
    this.roomsService.addRoom(room).subscribe((res) => {
      this.roomList = res;
    });
  }
  edit() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Suite',
      amenities: 'All',
      price: 20000,
      photos: '',
      checkinTime: new Date(),
      checkoutTime: new Date(),
      rating: 2,
    };

    this.roomsService.updateRoom(room).subscribe((res) => {
      this.roomList = res;
    });
  }

  delete() {
    this.roomsService.deleteRoom('3').subscribe((res) => {
      this.roomList = res;
    });
  }
}
