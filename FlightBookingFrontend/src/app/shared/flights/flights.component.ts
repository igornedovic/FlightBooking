import { Component, Input, OnInit } from '@angular/core';
import { Flight } from 'src/app/models/flight.model';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  @Input() flights: Flight[];

  constructor() { }

  ngOnInit(): void {
  }

}
