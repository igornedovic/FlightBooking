import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { Flight } from 'src/app/models/flight.model';
import { User } from 'src/app/models/user.model';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-flight-booking-modal',
  templateUrl: './flight-booking-modal.component.html',
  styleUrls: ['./flight-booking-modal.component.css']
})
export class FlightBookingModalComponent implements OnInit, OnDestroy {
  title?: string;
  flight?: Flight;
  user?: User;
  newReservationForm: FormGroup;
  private reservationSub: Subscription;
  
  constructor(public bsModalRef: BsModalRef, 
              private toastrService: ToastrService,
              private reservationService: ReservationService) { }

  ngOnInit() {
    this.newReservationForm = new FormGroup({
      numberOfSeats: new FormControl('', Validators.required),
      userId: new FormControl(this.user.userId, Validators.required),
      flightId: new FormControl(this.flight.flightId, Validators.required)
    });
  }

  onBookFlight() {
    this.reservationSub = this.reservationService.addNewReservation(this.newReservationForm.value)
                                    .subscribe(success => {
                                      this.toastrService.success('Successfully added new reservation!');
                                      this.bsModalRef.hide();
                                    })
  }

  ngOnDestroy() {
    if (this.reservationSub) {
      this.reservationSub.unsubscribe();
    }
  }
}
