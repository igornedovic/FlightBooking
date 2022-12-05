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
      const roles = route.data['allowedRoles'] as string[];

      if (roles) {
        if (this.authService.roleMatch(roles)) {
          return true;
        }
      }

      this.toastr.error('You cannot enter this area');
      this.router.navigateByUrl('/home');
      return false;
    }

    this.router.navigateByUrl('/login');
  }
  
}
