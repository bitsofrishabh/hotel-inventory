import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  roomId: number = 0;

  id$ = this.router.paramMap.pipe(
    map((params: any) => params.get('roomId')));

  ngOnInit(): void {

    this.router.params.subscribe((res: any) => {
      this.roomId = res.roomid;
      console.log("res", res);
    })
  }

  constructor(private router: ActivatedRoute) {
  }


}
