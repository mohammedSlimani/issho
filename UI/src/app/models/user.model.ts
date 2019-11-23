export class User {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public _token: string,
    public _tokenExpirationDate: Date
  ) {}

  get token() {
    if(!this._tokenExpirationDate || this._tokenExpirationDate <= new Date()) {
      return null;
    }
    return this._token;
  }
}
