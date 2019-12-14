export class User {
         constructor(
          public id: string,
          public name: string,
          public email: string,
          public pwd: string = '',
          public googleId: string = '',
          public approved: boolean = true,
          public imgUrl: string = '',
          public deleted: boolean = false
         ) {}
       }
