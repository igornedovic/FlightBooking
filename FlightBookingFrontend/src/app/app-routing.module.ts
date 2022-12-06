import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guard/admin.guard';

import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { AdminComponent } from './admin/admin.component';
import { FlightsComponent } from './shared/flights/flights.component';
import { AgentComponent } from './agent/agent.component';
import { VisitorComponent } from './visitor/visitor.component';

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
        component: FlightsComponent
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
        canActivate: [AdminGuard],
        data: {
          allowedRoles: ['Administrator']
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
        component: FlightsComponent
      },
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
        component: FlightsComponent
      },

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
