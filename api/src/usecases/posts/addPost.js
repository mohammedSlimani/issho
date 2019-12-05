import makePost from "../../entities/post";

export default function makeAddPost({postsDb}){
    return async function addPost(postInfo){
        const post = makePost(postInfo);

        // in here we can monitor the post, the image, and send stuff to the AI
        // if everything is okay
        post.approve();

        return postsDb.insert({
            id: post.getId(),
            imgUrl: post.getImgUrl(),
            authorId: post.getAuthorId(),
            des: post.getDes(),
            dateAdded: post.getDateAdded(),
            location: post.getLocation(),
            approved: post.getApproved(),
            usersPended: post.getUsersPended(),
            usersApproved : post.getUsersApproved(),
            usersRejected: post.getUsersRejected()
        })
    }
}