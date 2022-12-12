import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { Flight, FlightStatus } from 'src/app/models/flight.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FlightService } from 'src/app/services/flight.service';
import { FlightBookingModalComponent } from './flight-booking-modal/flight-booking-modal.component';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit, OnDestroy {
  @Input() flights: Flight[];
  cancelledFlightId: number;
  statusCancelled = FlightStatus.Cancelled;
  currentDatePlusThree: Date = new Date();
  user: User;
  private userSub: Subscription;
  bsModalRef?: BsModalRef;

  constructor(public authService: AuthService, 
              private flightService: FlightService,
              private toastrService: ToastrService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.currentDatePlusThree.setDate(this.currentDatePlusThree.getDate() + 3);

    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    })
  }

  onCancelFlight(id: number) {
    this.flightService.cancelFlight(id).subscribe(response => {
      this.toastrService.success(response);
    });
  }

  onBookFlight(flight: Flight) {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Flight booking',
        flight: flight,
        user: this.user
      }
    };
    this.bsModalRef = this.modalService.show(FlightBookingModalComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.setClass('modal-lg');
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
