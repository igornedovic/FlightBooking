import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Reservation } from 'src/app/models/reservation.model';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: ['./user-reservation.component.css']
})
export class UserReservationComponent implements OnInit, OnDestroy {
  userReservations: Reservation[];
  private userId: number;
  private userSub: Subscription;
  private reservationSub: Subscription;

  constructor(private authService: AuthService, private reservationService: ReservationService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      if (user)
      {
        this.userId = user.userId
        this.reservationService.getReservationsByUser(this.userId).subscribe(() => {});
      }
    })


    this.reservationSub = this.reservationService.reservations.subscribe(reservations => {
      this.userReservations = reservations;
    })
  }

  ngOnDestroy() {
    if (this.reservationSub) {
      this.reservationSub.unsubscribe();
    }
  }
}
