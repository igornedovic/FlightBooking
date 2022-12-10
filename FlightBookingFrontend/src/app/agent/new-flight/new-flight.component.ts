import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

import { City } from 'src/app/models/city.model';
import { Flight } from 'src/app/models/flight.model';
import { CityService } from 'src/app/services/city.service';
import { FlightService } from 'src/app/services/flight.service';
import { NewFlightModalComponent } from './new-flight-modal/new-flight-modal.component';

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.css']
})
export class NewFlightComponent implements OnInit, OnDestroy {
  bsModalRef?: BsModalRef;
  flights: Flight[];
  cities: City[];
  private flightSub: Subscription;

  constructor(private flightService: FlightService, 
              private cityService: CityService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.flightService.getAllFlights().subscribe(() => {});

    this.flightSub = this.flightService.flights.subscribe(flights => {
      this.flights = flights;
    })

    this.cityService.getCities().subscribe(cities => {
      this.cities = cities;
    })
  }

  openNewFlightModal() {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Add new flight',
        cities: this.cities
      }
    };
    this.bsModalRef = this.modalService.show(NewFlightModalComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.setClass('modal-lg');
  }

  ngOnDestroy() {
    if (this.flightSub) {
      this.flightSub.unsubscribe();
    }
  }
}
