import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Reservation, ReservationStatus } from 'src/app/models/reservation.model';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';

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

  constructor(public authService: AuthService, 
              private reservationService: ReservationService,
              private toastrService: ToastrService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.authService.roleMatch(['Agent'])) {
      this.selectedStatusRef.nativeElement.disabled = true;
      this.saveButton.nativeElement.disabled = true;
    }
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

  onChangeStatus(id: number, selectedStatus: HTMLInputElement) {
    this.reservationService.changeReservationStatus(id, selectedStatus.value).subscribe(response => {
      this.toastrService.success(response);
    })

    this.selectedStatusRef.nativeElement.disabled = true;
    this.changeStatusCheckboxRef.nativeElement.checked = false;
    this.saveButton.nativeElement.disabled = true;
  }
}
