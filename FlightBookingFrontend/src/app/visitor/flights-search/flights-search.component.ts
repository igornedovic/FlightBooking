import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { City } from 'src/app/models/city.model';
import { Flight } from 'src/app/models/flight.model';
import { FlightQueryParams } from 'src/app/models/flightQueryParams.model';
import { CityService } from 'src/app/services/city.service';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html',
  styleUrls: ['./flights-search.component.css'],
})
export class FlightsSearchComponent implements OnInit, OnDestroy {
  cities: City[];
  flyingFromCities: City[];
  flyingToCities: City[];
  flightQueryParams = new FlightQueryParams();
  searchedFlights: Flight[];

  isLoading = false;
  isCollapsed = false;

  constructor(
    private flightService: FlightService,
    private cityService: CityService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.cityService.getCities().subscribe((cities) => {
      this.cities = cities;

      this.flyingFromCities = this.cities.slice();
      this.flyingToCities = this.cities.slice();
    });
  }

  onLocationChange(event: HTMLInputElement) {
    if (event.id === 'ff') {
      this.flyingToCities = this.cities.filter((c) => c.name !== event.value);
    } else {
      this.flyingFromCities = this.cities.filter(
        (c) => c.name !== event.value);
    }
  }

  onLayoverChange(event: HTMLInputElement) {
    if (event.checked) {
      this.flightQueryParams.layoverNumber = +event.value;
      this.onSearchFlights();
    } else {
      this.onSearchFlights();
    }
  }

  onSearchFlights() {
    this.flightService.getFlights(this.flightQueryParams).subscribe(flights => {
      console.log(flights);
      this.searchedFlights = flights;
      this.isLoading = false;
    })
  }

  ngOnDestroy() {
    // if (this.flightSub) {
    //   this.flightSub.unsubscribe();
    // }
  }
}
