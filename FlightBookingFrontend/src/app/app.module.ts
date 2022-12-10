import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { NewUserComponent } from './admin/manage-users/new-user/new-user.component';
import { ViewUserComponent } from './admin/manage-users/view-user/view-user.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JwtInterceptor } from './interceptors/token.interceptor';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { VisitorComponent } from './visitor/visitor.component';
import { FlightsComponent } from './shared/flights/flights.component';
import { NewFlightComponent } from './agent/new-flight/new-flight.component';
import { NewFlightModalComponent } from './agent/new-flight/new-flight-modal/new-flight-modal.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AdminFlightsComponent } from './admin/admin-flights/admin-flights.component';
import { FlightsSearchComponent } from './visitor/flights-search/flights-search.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [AppComponent, LoginComponent, NavComponent, ManageUsersComponent, NewUserComponent, ViewUserComponent, AdminComponent, AgentComponent, VisitorComponent, FlightsComponent, NewFlightComponent, NewFlightModalComponent, AdminFlightsComponent, FlightsSearchComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
