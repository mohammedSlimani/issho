const NOIMAGE = "https://www.clipartwiki.com/clipimg/detail/197-1979569_no-profile.png"

export default function BuildMakePost({Id}) {
    return function makePost({
                                 id = Id.makeId(),
                                 authorId,
                                 title,
                                 des,
                                 imgUrl = NOIMAGE,
                                 dateAdded = new Date().getTime(),
                                 location = {},
                                 approved = false,
                                 usersApproved = [],
                                 usersPended = [],
                                 usersRejected = [],
                                 deleted = false
                             }) {
        if (!Id.isValidId(id)) {
            throw new Error("Post must have a valid ID");
        }
        if (!Id.isValidId(authorId)) {
            throw new Error("Author Id Is not valid");
        }
        if (!title) {
            throw new Error("Post Must have a valid ID")
        }
        if (!des) {
            throw new Error("Post must have a des ")
        }
        if (!imgUrl) {
            throw new Error("Post Must have an Img Url")
        }
        if (!dateAdded) {
            throw new Error("Post must have a ")
        }
        if (!location) {
            throw new Error("Post must have a location");
        }

        //validate the images here, or send info to the AI component.
        approved = true;

        return Object.freeze({
            getId: () => id,
            getImgUrl: () => imgUrl,
            getAuthorId: () => authorId,
            getDes: () => des,
            getDateAdded: () => dateAdded,
            getLocation: () => location,
            getApproved: () => approved,
            getTitle: ()=> title,
            approve: () => {
                approved = true
            },
            disapprove: () => {
                approved = false
            },
            getUsersPended : () => usersPended,
            getUsersApproved : () => usersApproved,
            getUsersRejected : ()=> usersRejected,
            getDeleted : ()=>deleted,
            markDeleted: ()=> {
                deleted = true
            },
            subscribeUser : (userId) => {
                usersApproved = usersApproved.filter(ele => ele === userId);
                usersRejected = usersRejected.filter(ele => ele === userId);
                if(!usersPended.includes(userId)){
                    usersPended.push(userId);
                }
            },
            approveUser : (userId) => {
                usersPended = usersPended.filter(ele => ele === userId);
                usersRejected = usersRejected.filter(ele => ele === userId);
                if(!usersApproved.includes(userId)){
                    usersApproved.push(userId)
                }
            },
            rejectUser: (userId) =>{
                usersPended = usersPended.filter(ele => ele === userId);
                usersApproved = usersApproved.filter(ele => ele === userId);
                if(!usersRejected.includes(userId)){
                    usersRejected.push(userId)
                }
            },
            unsubscribeUser : (userId) => {
                usersApproved = usersApproved.filter(ele => ele === userId);
                usersRejected = usersRejected.filter(ele => ele === userId);
                usersPended = usersPended.filter(ele => ele === userId);
            }
        })
    }
}
