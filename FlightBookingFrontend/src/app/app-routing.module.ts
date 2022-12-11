import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guard/admin.guard';

import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { VisitorComponent } from './visitor/visitor.component';
import { NewFlightComponent } from './agent/new-flight/new-flight.component';
import { AdminFlightsComponent } from './admin/admin-flights/admin-flights.component';
import { FlightsSearchComponent } from './visitor/flights-search/flights-search.component';
import { ReservationsComponent } from './agent/reservations/reservations.component';
import { UserReservationComponent } from './visitor/user-reservation/user-reservation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'administrator',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'flights',
        pathMatch: 'full',
      },
      {
        path: 'flights',
        component: AdminFlightsComponent
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
        canActivate: [AdminGuard],
        data: {
          allowedRole: ['Administrator']
        }
      }
    ]
  },
  {
    path: 'agent',
    component: AgentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'flights',
        pathMatch: 'full',
      },
      {
        path: 'flights',
        component: NewFlightComponent
      },
      {
        path: 'reservations',
        component: ReservationsComponent,
      }
    ]
  },
  {
    path: 'visitor',
    component: VisitorComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'flights',
        pathMatch: 'full',
      },
      {
        path: 'flights',
        component: FlightsSearchComponent
      },
      {
        path: 'reservations',
        component: UserReservationComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
