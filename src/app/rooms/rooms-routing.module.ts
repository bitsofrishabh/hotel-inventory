import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsGuard } from './guards/rooms.guard';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsComponent } from './rooms.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
    // canActivateChild: [RoomsGuard],
    children: [
      {
        path: 'add',
        component: RoomsAddComponent,
      },
      // {
      //   path: ':roomid',
      //   component: RoomsBookingComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule {}
