import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

import { AuthService } from '../services/auth.service';
  
  
  @Injectable()
  export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
  
      let currentUser: User;
  
      this.authService.user
        .pipe(take(1))
        .subscribe((user) => (currentUser = user));
  
      if (currentUser) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      }
  
      return next.handle(request);
    }
  }
  