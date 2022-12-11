import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Flight, FlightStatus } from 'src/app/models/flight.model';
import { AuthService } from 'src/app/services/auth.service';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  @Input() flights: Flight[];
  cancelledFlightId: number;
  statusCancelled = FlightStatus.Cancelled;
  currentDatePlusThree: Date = new Date();

  constructor(public authService: AuthService, 
              private flightService: FlightService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.currentDatePlusThree.setDate(this.currentDatePlusThree.getDate() + 3);
  }

  onCancelFlight(id: number) {
    this.flightService.cancelFlight(id).subscribe(response => {
      this.toastrService.success(response);
    });
  }

  onBookFlight() {

  }
}
