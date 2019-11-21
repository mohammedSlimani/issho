export class User {
  constructor(
    public id: string,
    public email: string,
    public pwd: string,
    public name: string,
    public imgUrl:
        string = 'https://365psd.com/images/istock/previews/9353/93539553-flat-vector-avatar-face-character-person-portrait-user-icon.jpg'
  ) {}
}
