import {makePost} from "../../entities";

export default function makeEditPost({postsDb, usersDb}) {
    return async function editPost({id, authorId, changes}){
        if(!authorId){
            throw new Error("You must supply an authorID that wants to edit this post");
        }
        if(!id){
            throw new Error("you must supply the id of the post you want to edit");
        }
        const existingUser = await usersDb.findById({id: authorId});
        if(!existingUser){
            throw new Error("the user trying to edit this post doesnt exist");
        }

        const existingPost = await postsDb.findById({id});
        if(!existingPost){
            throw new Error("the Post you are trying to edit doesnt exist");
        }

        const updatedPost = makePost({id : existingPost.id, ...existingPost, ...changes })

        return postsDb.update({
            id: updatedPost.getId(),
            imgUrl: updatedPost.getImgUrl(),
            authorId: updatedPost.getAuthorId(),
            des: updatedPost.getDes(),
            dateAdded: updatedPost.getDateAdded(),
            location: updatedPost.getLocation(),
            approved: updatedPost.getApproved(),
            usersPended: updatedPost.getUsersPended(),
            usersApproved : updatedPost.getUsersApproved(),
            usersRejected: updatedPost.getUsersRejected()
        })

    }
}