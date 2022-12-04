export interface UserInterface {
    userId: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    token?: string
}

export class User {
    constructor(
      public userId: number,
      public username: string,
      public email: string,
      public firstName: string,
      public lastName: string,
      public role: string,
      private _token: string
    ) {}
  
    get token() {
      if (!this._token) {
        return null;
      }
  
      return this._token;
    }
  }