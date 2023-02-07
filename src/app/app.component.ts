import {
  AfterViewInit,
  Component,
  Inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { localStorageToken } from './localstorage.token';
import { RoomsComponent } from './rooms/rooms.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hotelinventory';

  role = 'Admin';

  @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  constructor(
    @Inject(localStorageToken) private localStorage: any,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.localStorage.setItem('name', 'Rajesh');
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        console.log('NavigationStart');
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('NavigationEnd');
      });
  }

  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }
}
