import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { FlightStatus } from '../models/flight.model';
import {
  Reservation,
  ReservationInterface,
  ReservationStatus,
} from '../models/reservation.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  apiUrl = environment.apiUrl;
  private _reservations = new BehaviorSubject<Reservation[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {}

  get reservations() {
    return this._reservations.asObservable();
  }

  addNewReservation(reservationForm: ReservationInterface) {
    let newReservation: Reservation;

    return this.http.post(this.apiUrl + 'reservations', reservationForm).pipe(
      take(1),
      switchMap((response: Reservation) => {
        newReservation = new Reservation(
          response.reservationId,
          response.firstName,
          response.lastName,
          response.flyingFromName,
          response.flyingToName,
          response.date,
          response.flightStatus,
          response.numberOfSeats,
          response.status
        );

        return this.reservations;
      }),
      take(1),
      tap((reservations) => {
        const newReservations = reservations.concat(newReservation);
        this._reservations.next(newReservations);
      })
    );
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
              r.flightStatus,
              r.numberOfSeats,
              r.status
            )
          );
        });

        return reservations;
      }),
      tap((reservations) => {
        this._reservations.next(reservations);
      })
    );
  }

  getReservationsByUser() {
    this._reservations.next(null);
    let fetchedUserId: number;

    return this.authService.userId.pipe(
      take(1),
      tap((userId) => {
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
      tap((reservations) => {
        this._reservations.next(reservations);
      })
    );
  }

  changeReservationStatus(id: number, status: string) {
    const newStatusAsEnum = status as ReservationStatus;
    let responseText: string;

    return this.http
      .put(
        this.apiUrl + `reservations/${id}`,
        { newStatus: status},
        { responseType: 'text' }
      )
      .pipe(
        switchMap((response) => {
          responseText = response;
          return this.reservations;
        }),
        take(1),
        map((reservations) => {
          const changedReservationIndex = reservations.findIndex(
            (r) => r.reservationId == id
          );
          reservations[changedReservationIndex].status = newStatusAsEnum;
          this._reservations.next(reservations);
          return responseText;
        })
      );
  }
}
