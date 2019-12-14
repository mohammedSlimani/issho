

export class Post {
         constructor(
           public id: string,
           public title: string,
           public des: string,
           public imgUrl: string,
           public authorId: string,
           public date: Date,
           public location: string = 'Rabat',
           public dateAdded: number = new Date().getTime(),
           public approved: boolean = false,
           public usersApproved: string[] = [],
           public usersPended: string[]   = [],
           public usersRejected: string[] = [],
           public deleted: boolean = false
         ) {}
       }


