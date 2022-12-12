import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Reservation, ReservationStatus } from 'src/app/models/reservation.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  @Input() reservation: Reservation;
  public reservationStatus = Object.values(ReservationStatus);

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onChangeStatus(selectedStatus: HTMLInputElement) {
    console.log(selectedStatus.value);
  }
}
