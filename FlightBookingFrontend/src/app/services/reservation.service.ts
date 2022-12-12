import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { FlightStatus } from '../models/flight.model';
import { Reservation } from '../models/reservation.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  apiUrl = environment.apiUrl;
  private _reservation = new BehaviorSubject<Reservation[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get reservations() {
    return this._reservation.asObservable();
  }

  getAllReservations() {
    return this.http.get<Reservation[]>(this.apiUrl + 'reservations').pipe(
      map((response) => {
        const reservations: Reservation[] = [];

        response.forEach((r) => {
          reservations.push(
            new Reservation(
              r.reservationId,
              r.firstName,
              r.lastName,
              r.flyingFromName,
              r.flyingToName,
              r.date,
              FlightStatus.Active,
              r.numberOfSeats,
              r.status
            )
          );
        });

        return reservations;
      }),
      tap(reservations => {
        this._reservation.next(reservations);
      })
    );
  }

  getReservationsByUser() {
    let fetchedUserId: number;

    return this.authService.userId.pipe(
      take(1),
      tap(userId => {
        fetchedUserId = userId;
      }),
      switchMap(() => {
        return this.http.get<Reservation[]>(
          this.apiUrl + `account/users/${fetchedUserId}/reservations`
        );
      }),
      map((response) => {
        const reservations: Reservation[] = [];

        response.forEach((r) => {
          reservations.push(
            new Reservation(
              r.reservationId,
              r.firstName,
              r.lastName,
              r.flyingFromName,
              r.flyingToName,
              r.date,
              r.flightStatus,
              r.numberOfSeats,
              r.status
            )
          );
        });

        return reservations;
      }),
      tap(reservations => {
        this._reservation.next(reservations);
      })
    )
  }
}
