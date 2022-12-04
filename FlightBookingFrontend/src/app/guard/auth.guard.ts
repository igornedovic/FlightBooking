import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isUserAutheticated.pipe(
      take(1),
      switchMap((isAuthenticated) => {
        if (!isAuthenticated && localStorage.getItem('user')) {
          return this.authService.autoLogin();
        } else {
          return of(isAuthenticated);
        }

      }),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.toastr.error('You must be logged in!');
          this.router.navigateByUrl('/login');
        }
      })
    );
   }
}
