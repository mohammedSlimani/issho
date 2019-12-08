import {makePost} from "../../entities";

export default function makeUnsubscribeUser ({usersDb, postsDb}) {
    return async function unsubscribeUser({postId, userId}){
        if(!postId){
            throw new Error("You have to supply the postID");
        }
        if(!userId){
            throw new Error("You have to supply the UserID");
        }

        const existingUser = await usersDb.findById({id: userId});
        if(!existingUser){
            throw new Error("The user you are trying to approve doesnt exist");
        }

        const existingPost = await postsDb.findById({id: postId});
        if(!existingPost){
            throw new Error("the post you are trying to access doesnt exist");
        }

        const updatedPost = makePost(existingPost);
        updatedPost.unsubscribeUser(userId);

        return  postsDb.update({
            id: updatedPost.getId(),
            imgUrl: updatedPost.getImgUrl(),
            authorId: updatedPost.getAuthorId(),
            des: updatedPost.getDes(),
            dateAdded: updatedPost.getDateAdded(),
            location: updatedPost.getLocation(),
            approved: updatedPost.getApproved(),
            usersPended: updatedPost.getUsersPended(),
            usersApproved : updatedPost.getUsersApproved(),
            usersRejected: updatedPost.getUsersRejected(),
            deleted: updatedPost.getDeleted()
        })
    }
}