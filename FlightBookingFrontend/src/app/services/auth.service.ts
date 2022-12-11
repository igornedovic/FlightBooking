import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  get isUserAutheticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  get user() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user;
        } else {
          return null;
        }
      })
    );
  }

  login(username: string, password: string) {
    let user: User;

    return this.http
      .post(this.apiUrl + 'account/login', {
        username: username,
        password: password,
      })
      .pipe(
        tap((response: User) => {
          user = new User(
            response.userId,
            response.username,
            response.email,
            response.firstName,
            response.lastName,
            response.role,
            response.token
          );

          this.storeAuthData(user);

          this._user.next(user);
          return user;
        })
      );
  }

  private storeAuthData(user: User) {
    const data = JSON.stringify({
      userId: user.userId,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token: user.token,
    });
    localStorage.setItem('user', data);
  }

  autoLogin() {
    return from(localStorage.getItem('user')).pipe(
      map((storedData) => {
        storedData = localStorage.getItem('user');
        if (!storedData) {
          return null;
        }

        const parsedData = JSON.parse(storedData) as {
          userId: number;
          username: string;
          email: string;
          firstName: string;
          lastName: string;
          role: string;
          token: string;
        };

        const user = new User(
          parsedData.userId,
          parsedData.username,
          parsedData.email,
          parsedData.firstName,
          parsedData.lastName,
          parsedData.role,
          parsedData.token
        );

        return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  }

  roleMatch(roles: string[]): boolean {
    let isRoleMatch = false;
    let userRole;
    
    this.user.subscribe(user => {
      if (user) {
        userRole = this.getRoleFromToken(user.token).role;
      }
    })

    roles.forEach(role => {
      if (role == userRole) {
        isRoleMatch = true;
      }
    });

    return isRoleMatch;
  }

  getRoleFromToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  logout() {
    localStorage.removeItem('user');
    this._user.next(null);
  }

}
