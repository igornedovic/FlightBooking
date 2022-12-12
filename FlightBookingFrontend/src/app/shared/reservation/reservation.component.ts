import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Reservation, ReservationStatus } from 'src/app/models/reservation.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit, AfterViewInit {
  @Input() reservation: Reservation;
  @ViewChild('selectedStatus') selectedStatusRef: ElementRef;
  @ViewChild('changeStatusCheckbox') changeStatusCheckboxRef: ElementRef;
  @ViewChild('saveButton') saveButton: ElementRef;
  public reservationStatus = Object.values(ReservationStatus);

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.selectedStatusRef.nativeElement.disabled = true;
    this.saveButton.nativeElement.disabled = true;
  }

  onChangeCheckbox(changeStatusCheckbox: HTMLInputElement) {
    if (changeStatusCheckbox.checked) {
      this.selectedStatusRef.nativeElement.disabled = false;
      this.saveButton.nativeElement.disabled = false;
    } else {
      this.selectedStatusRef.nativeElement.disabled = true;
      this.saveButton.nativeElement.disabled = true;
    }
  }

  onChangeStatus(selectedStatus: HTMLInputElement) {
    console.log(selectedStatus.value);
    this.selectedStatusRef.nativeElement.disabled = true;
    this.changeStatusCheckboxRef.nativeElement.checked = false;
    this.saveButton.nativeElement.disabled = true;
  }
}
