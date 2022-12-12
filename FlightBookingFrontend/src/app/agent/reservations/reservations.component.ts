import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Reservation, ReservationStatus } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit, OnDestroy {
  reservationsPending: Reservation[] = [];
  reservationsAccepted: Reservation[] = [];
  reservationsRejected: Reservation[] = [];
  private reservationSub: Subscription;

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.reservationService.getAllReservations().subscribe(() => {});

    this.reservationSub = this.reservationService.reservations.subscribe(reservations => {
      this.reservationsPending = reservations.filter(r => r.status == ReservationStatus.Pending);
      this.reservationsAccepted = reservations.filter(r => r.status == ReservationStatus.Accepted);
      this.reservationsRejected = reservations.filter(r => r.status == ReservationStatus.Rejected);
    })
  }

  ngOnDestroy() {
    if (this.reservationSub) {
      this.reservationSub.unsubscribe();
    }
  }

}
