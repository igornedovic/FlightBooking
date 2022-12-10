import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Flight, FlightInterface } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  apiUrl = environment.apiUrl;
  private _flights = new BehaviorSubject<Flight[]>([]);

  constructor(private http: HttpClient) { }

  get flights() {
    return this._flights.asObservable();
  }

  addNewFlight(flightForm: FlightInterface) {
    let newFlight;

    return this.http
      .post(this.apiUrl + 'flights', flightForm)
      .pipe(
        take(1),
        switchMap((response: Flight) => {
          newFlight = new Flight(
            response.flightId,
            response.flyingFromName,
            response.flyingToName,
            response.date,
            response.status,
            response.numberOfSeats,
            response.layoverNumber
          )

          return this.flights;
        }),
        take(1),
        tap((flights) => {
          const newFlights = flights.concat(newFlight);
          this._flights.next(newFlights);
        })
      );
  }

  getAllFlights() {
    return this.http.get<Flight[]>(this.apiUrl + 'flights').pipe(
      map((response) => {
        const flights: Flight[] = [];

        response.forEach((f) => {
          flights.push(
            new Flight(
              f.flightId,
              f.flyingFromName,
              f.flyingToName,
              f.date,
              f.status,
              f.numberOfSeats,
              f.layoverNumber
            )
          );
        });

        return flights;
      }),
      tap(flights => {
        this._flights.next(flights);
      })
    );
  }
}
