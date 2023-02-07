import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomList } from '../rooms';
import { RoomsService } from '../rooms-list/services/rooms.service';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss'],
})
export class RoomsAddComponent {
  constructor(private roomService: RoomsService) {}

  successMessage: string = '';
  room: RoomList = {
    roomNumber: '',
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating: 0,
  };

  AddRoom(roomsForm: NgForm) {
    this.roomService.addRoom(this.room).subscribe((data) => {
      this.successMessage = 'Room Added Successfully';
      roomsForm.resetForm({
        roomType: '',
        amenities: '',
        checkinTime: new Date(),
        checkoutTime: new Date(),
        photos: '',
        price: 0,
        rating: 0,
      });
    });
  }
}
