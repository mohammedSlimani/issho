export default function BuildMakePost({Id}) {
    return function makePost({
                                 id = Id.makeId(),
                                 authorId,
                                 title,
                                 des,
                                 imgUrl,
                                 dateAdded = new Date().getTime(),
                                 location,
                                 approved = false
                             }){
        if(!Id.isValidId(id)){
            throw new Error("Post must have a valid ID");
        }
        if (!Id.isValidId(authorId)){
            throw new Error("Author Id Is not valid");
        }
        if (!title){
            throw new Error("Post Must have a valid ID")
        }
        if(!des){
            throw new Error("Post must have a des ")
        }
        if(!imgUrl){
            throw new Error("Post Must have an Img Url")
        }
        if(!dateAdded){
            throw new Error("Post must have a ")
        }
        if(!location){
            throw new Error("Post must have a location");
        }

        //validate the images here, or send info to the AI component.
        approved = true;

        return Object.freeze({
            getId : ( ) => id,
            getImgUrl: ()=> imgUrl,
            getAuthorId:()=> authorId,
            getDes : () => des,
            getDateAdded : ()=> dateAdded,
            getLocation: ()=> location,
            getApproved : ()=> approved,
            approve : () => {
                approved = true
            },
            disapprove : ()=>{
                approved = false
            }
        })
    }
}
