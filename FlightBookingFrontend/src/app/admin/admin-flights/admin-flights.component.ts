import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Flight } from 'src/app/models/flight.model';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.css']
})
export class AdminFlightsComponent implements OnInit, OnDestroy {
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
