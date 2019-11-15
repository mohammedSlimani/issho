

export class Post {
    constructor(
        public id: string,
        public title: string,
        public des: string,
        public imgUrl: string,
        public userId: string,
        public date: Date,
        public loc: string = 'Rabat',
        public goin: number = 86
    ) {}
}


