import { Component, OnInit } from '@angular/core';
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
export class FlightsSearchComponent implements OnInit {
  cities: City[];
  flyingFromCities: City[];
  flyingToCities: City[];
  flightQueryParams = new FlightQueryParams();
  searchedFlights: Flight[];

  isLoading = false;
  isCollapsed = false;
  isFirst = true;

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

      if (this.isFirst) {
        this.flightQueryParams.flyingTo = '';
        this.isFirst = !this.isFirst;
      }
    } else {
      this.flyingFromCities = this.cities.filter((c) => c.name !== event.value);

      if (this.isFirst) {
        this.flightQueryParams.flyingFrom = '';
        this.isFirst = !this.isFirst;
      }
    }
  }

  onLayoverChange(event: HTMLInputElement) {
    if (event.checked) {
      this.flightQueryParams.layoverNumber = +event.value;
      this.onSearchFlights();
    } else {
      this.flightQueryParams.layoverNumber = null;
      this.onSearchFlights();
    }
  }

  onSearchFlights() {
    this.flightService
      .getFlights(this.flightQueryParams)
      .subscribe((flights) => {
        this.searchedFlights = flights;
        this.searchedFlights.forEach(f => {
          f.date = new Date(f.date);
        })

        this.isLoading = false;
      }, error => {
        this.searchedFlights = null;
      });
  
  }
}
