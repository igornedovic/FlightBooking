import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('user') != null) {
      const role = route.data['allowedRole'] as string[];

      if (role) {
        if (this.authService.roleMatch(role)) {
          return true;
        }
      }

      this.toastr.error('You cannot enter this area');

      this.authService.user.subscribe(user => {
        this.router.navigateByUrl('/' + user?.role.toLocaleLowerCase());
        return false;
      })
    }
  }
  
}
