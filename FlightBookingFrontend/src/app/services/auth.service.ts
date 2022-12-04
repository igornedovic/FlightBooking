import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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


}
