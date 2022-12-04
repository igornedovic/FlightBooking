import { Component } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FlightBookingFrontend';

  constructor(private toastr: ToastrService) {}

  success() {
    this.toastr.success("Hello world!");
  }
}
