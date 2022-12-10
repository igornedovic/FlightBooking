import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Flight } from 'src/app/models/flight.model';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html',
  styleUrls: ['./flights-search.component.css']
})
export class FlightsSearchComponent implements OnInit, OnDestroy {
  flights: Flight[];
  private flightSub: Subscription;

  constructor(private flightService: FlightService) { }

  ngOnInit() {
    this.flightService.getAllFlights().subscribe(() => {});

    this.flightSub = this.flightService.flights.subscribe(flights => {
      this.flights = flights;
    })
  }

  ngOnDestroy() {
    if (this.flightSub) {
      this.flightSub.unsubscribe();
    }
  }
}
