import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, UserInterface } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;
  private _agents = new BehaviorSubject<User[]>([]);
  private _visitors = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) { }

  get agents() {
    return this._agents.asObservable();
  }

  get visitors() {
    return this._visitors.asObservable();
  }

  addNewUser(userForm: UserInterface) {
    let newUser;

    return this.http.post<UserInterface>(this.apiUrl + 'account/register', userForm).pipe(
      take(1),
      switchMap((response: User) => {
        newUser = new User(
          response.userId,
          response.username,
          response.email,
          response.firstName,
          response.lastName,
          response.role,
          response.token
        );
        
        if (newUser.role === "Agent") {
          return this.agents;
        } else {
          return this.visitors
        }
      }),
      take(1),
      tap(userArray => {
        const newUserArray = userArray.concat(newUser);

        if (newUser.role === "Agent") {
          this._agents.next(newUserArray);
        } else {
          this._visitors.next(newUserArray);
        }
      })
    );
  }
}
