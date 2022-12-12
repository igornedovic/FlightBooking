import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { Flight } from 'src/app/models/flight.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-flight-booking-modal',
  templateUrl: './flight-booking-modal.component.html',
  styleUrls: ['./flight-booking-modal.component.css']
})
export class FlightBookingModalComponent implements OnInit {
  title?: string;
  flight?: Flight;
  user?: User;
  newReservationForm: FormGroup;
  
  constructor(public bsModalRef: BsModalRef, private toastrService: ToastrService) { }

  ngOnInit() {
    this.newReservationForm = new FormGroup({
      numberOfSeats: new FormControl('', Validators.required),
      userId: new FormControl(this.user.userId, Validators.required),
      flightId: new FormControl(this.flight.flightId, Validators.required)
    });
  }

  onBookFlight() {
    console.log(this.newReservationForm.value);
  }
}
