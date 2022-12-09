import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Flight } from 'src/app/models/flight.model';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.css']
})
export class NewFlightComponent implements OnInit, OnDestroy {
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
