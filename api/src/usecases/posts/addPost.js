import {makePost} from "../../entities";

export default function makeAddPost({postsDb, usersDb}){
    return async function addPost(postInfo){
        const post = makePost(postInfo);

        const existingUser = await usersDb.findById({id: postInfo.authorId});
        if(!existingUser || Object.entries(existingUser).length === 0){
            throw new Error("the user trying to make this post doesnt exist");
        }

        // in here we can monitor the post, the image, and send stuff to the AI
        // if everything is okay
        post.approve();

        return postsDb.insert({
            id: post.getId(),
            imgUrl: post.getImgUrl(),
            authorId: post.getAuthorId(),
            title:post.getTitle(),
            des: post.getDes(),
            dateAdded: post.getDateAdded(),
            location: post.getLocation(),
            approved: post.getApproved(),
            usersPended: post.getUsersPended(),
            usersApproved : post.getUsersApproved(),
            usersRejected: post.getUsersRejected(),
            deleted: post.getDeleted()
        })
    }
}