import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './home/nav/nav.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { NewUserComponent } from './manage-users/new-user/new-user.component';
import { ViewUserComponent } from './manage-users/view-user/view-user.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JwtInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, NavComponent, ManageUsersComponent, NewUserComponent, ViewUserComponent],
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
    ModalModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
