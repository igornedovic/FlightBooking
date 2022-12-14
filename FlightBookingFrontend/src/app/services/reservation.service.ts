import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as signalR from '@microsoft/signalr';

import { environment } from 'src/environments/environment';
import {
  Reservation,
  ReservationInterface,
  ReservationStatus,
} from '../models/reservation.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  apiUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private signalRHubConnection?: signalR.HubConnection;
  private _reservations = new BehaviorSubject<Reservation[]>([]);

  constructor(private http: HttpClient, private toastrService: ToastrService) {}

  get reservations() {
    return this._reservations.asObservable();
  }

  createHubConnection(userRole: string, userId: number = null) {
    const userRoleQueryParam = this.hubUrl + 'reservation?userRole=' + userRole;
    let userIdQueryParam = '';

    if (userId) {
       userIdQueryParam = '&userId=' + userId;
    }

    const hubUrlWithQueryParams = userRoleQueryParam.concat(userIdQueryParam);

    this.signalRHubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrlWithQueryParams)
      .withAutomaticReconnect()
      .build();

    this.signalRHubConnection.start().catch((error) => console.log(error));

    this.signalRHubConnection.on('NewReservation', newReservation => {
      this.reservations.pipe(take(1)).subscribe(reservations => {
        const newReservations = reservations.concat(newReservation);
        this._reservations.next(newReservations);
      })
    })

    this.signalRHubConnection.on('UpdatedReservationStatus', (id, newStatus) => {
      this.reservations.pipe(take(1)).subscribe(reservations => {
        const changedReservationIndex = reservations.findIndex(
          (r) => r.reservationId == id
        );
        const newStatusAsEnum = newStatus as ReservationStatus;
        reservations[changedReservationIndex].status = newStatusAsEnum;
        this._reservations.next(reservations);
      })
    })
  }

  stopHubConnection() {
    if (this.signalRHubConnection) {
      this.signalRHubConnection.stop().catch((error) => console.log(error));
    }
  }

  addNewReservation(reservationFormValue: ReservationInterface) {
    // let newReservation: Reservation;

    // return this.http.post(this.apiUrl + 'reservations', reservationFormValue).pipe(
    //   take(1),
    //   switchMap((response: Reservation) => {
    //     newReservation = new Reservation(
    //       response.reservationId,
    //       response.firstName,
    //       response.lastName,
    //       response.flyingFromName,
    //       response.flyingToName,
    //       response.date,
    //       response.flightStatus,
    //       response.numberOfSeats,
    //       response.status,
    //       response.flightId
    //     );

    //     return this.reservations;
    //   }),
    //   take(1),
    //   tap((reservations) => {
    //     const newReservations = reservations.concat(newReservation);
    //     this._reservations.next(newReservations);
    //   })
    // );

    return this.signalRHubConnection?.invoke('AddReservation', reservationFormValue)
                  .catch(error => console.log(error));
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
              r.status,
              r.flightId
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

  getReservationsByUser(userId: number) {
    this._reservations.next(null);

    return this.http
      .get<Reservation[]>(this.apiUrl + `account/users/${userId}/reservations`)
      .pipe(
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
                r.status,
                r.flightId
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

  changeReservationStatus(id: number, status: string, firstName: string, lastName: string, flightId: number, numberOfSeats: number) {
    // const newStatusAsEnum = status as ReservationStatus;
    // let responseText: string;

    // return this.http
    //   .put(
    //     this.apiUrl + `reservations/${id}`,
    //     { newStatus: status,
    //       flightId: flightId,
    //       numberOfSeats: numberOfSeats },
    //     { responseType: 'text' }
    //   )
    //   .pipe(
    //     switchMap((response) => {
    //       responseText = response;
    //       return this.reservations;
    //     }),
    //     take(1),
    //     map((reservations) => {
    //       const changedReservationIndex = reservations.findIndex(
    //         (r) => r.reservationId == id
    //       );
    //       reservations[changedReservationIndex].status = newStatusAsEnum;
    //       this._reservations.next(reservations);
    //       return responseText;
    //     })
    //   );

    return this.signalRHubConnection
              ?.invoke('UpdateReservationStatus', id, status, firstName, lastName, flightId, numberOfSeats)
              .catch(error => console.log(error));
  }
}
