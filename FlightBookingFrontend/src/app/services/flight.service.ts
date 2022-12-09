import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Flight } from '../models/flight.model';

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
