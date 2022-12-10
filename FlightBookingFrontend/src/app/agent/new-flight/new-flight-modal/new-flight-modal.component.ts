import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { City } from 'src/app/models/city.model';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-new-flight-modal',
  templateUrl: './new-flight-modal.component.html',
  styleUrls: ['./new-flight-modal.component.css']
})
export class NewFlightModalComponent implements OnInit {
  title?: string;
  cities?: City[];
  closeBtnName?: string;
  newFlightForm: FormGroup;
  private flightSub: Subscription;
  bsConfig?: Partial<BsDatepickerConfig>;
  colorTheme = 'theme-default';

  constructor(
    public bsModalRef: BsModalRef,
    private flightService: FlightService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.newFlightForm = new FormGroup({
      flyingFromId: new FormControl('', Validators.required),
      flyingToId: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      numberOfSeats: new FormControl('', Validators.required),
      layoverNumber: new FormControl('', Validators.required),
    });

    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
  }

  onAddFlight() {
    this.flightSub = this.flightService.addNewFlight(this.newFlightForm.value).subscribe(success => {
      this.toastrService.success("Successfully added new flight!");
      this.bsModalRef.hide();
    })
  }

  ngOnDestroy() {
    if (this.flightSub) {
      this.flightSub.unsubscribe();
    }
  }
}
