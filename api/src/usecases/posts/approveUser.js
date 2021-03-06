import {makePost} from "../../entities";

export default function makeApproveUser ({usersDb, postsDb}) {
    return async function approveUser({postId, userId}){
        if(!postId){
            throw new Error("You have to supply the postID");
        }
        if(!userId){
            throw new Error("You have to supply the UserID");
        }

        const existingUser = await usersDb.findById({id: userId});
        if(!existingUser || Object.entries(existingUser).length === 0){
            throw new Error("The user you are trying to approve doesnt exist");
        }

        const existingPost = await postsDb.findById({id: postId});
        if(!existingPost || Object.entries(existingPost).length === 0){
            throw new Error("the post you are trying to access doesnt exist");
        }

        const updatedPost = makePost(existingPost);
        updatedPost.approveUser(userId);

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
            deleted: updatedPost.getDeleted(),
            title:updatedPost.getTitle(),
        })
    }
}