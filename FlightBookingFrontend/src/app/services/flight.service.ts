import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Flight, FlightInterface, FlightStatus } from '../models/flight.model';
import { FlightQueryParams } from '../models/flightQueryParams.model';

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

  getFlights(flightQueryParams: FlightQueryParams = null) {
    let queryParams = new HttpParams();

    if (flightQueryParams) {

      queryParams = queryParams.append('flyingFrom', flightQueryParams.flyingFrom);
      queryParams = queryParams.append('flyingTo', flightQueryParams.flyingTo);

      if (flightQueryParams.layoverNumber === 0) {
        queryParams = queryParams.append('layoverNumber', flightQueryParams.layoverNumber);
      }
    }

    return this.http.get<Flight[]>(this.apiUrl + 'flights', {params: queryParams}).pipe(
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

  cancelFlight(id: number, status: FlightStatus = FlightStatus.Cancelled) {
    let responseText: string;
    return this.http.put(this.apiUrl + `flights/${id}/cancel`, {}, {responseType: 'text'}).pipe(
      switchMap(response => {
        responseText = response;
        return this.flights;
      }),
      take(1),
      map(flights => {
        const cancelledFlightIndex = flights.findIndex(f => f.flightId == id);
        flights[cancelledFlightIndex].status = status;
        console.log(flights);
        this._flights.next(flights);
        return responseText;
      })
    )
  }
}
