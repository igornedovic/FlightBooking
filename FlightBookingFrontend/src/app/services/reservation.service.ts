import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  apiUrl = environment.apiUrl;
  private _reservation = new BehaviorSubject<Reservation[]>([]);

  constructor(private http: HttpClient) { }

  get reservations() {
    return this._reservation.asObservable();
  }

  getAllReservations() {
    
  }
}
