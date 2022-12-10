import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get<City[]>(
      this.apiUrl + 'cities'
    ).pipe(
      map(response => {
        const cities: City[] = [];

        response.forEach(c => {
          cities.push(
            new City(c.cityId, c.name)
          );
        });

        return cities;
      })
    );
  }
}
