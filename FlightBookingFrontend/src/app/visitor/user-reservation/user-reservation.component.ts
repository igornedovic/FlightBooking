import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: ['./user-reservation.component.css']
})
export class UserReservationComponent implements OnInit, OnDestroy {
  userReservations: Reservation[];
  private reservationSub: Subscription;

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.reservationService.getReservationsByUser().subscribe(() => {});

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
