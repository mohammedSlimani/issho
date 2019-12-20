import {makePost} from "../../entities";

export default function makeDeletePost({ postsDb }) {
    return async function deletePost({ id, authorId }) {
        if (!id) {
            throw new Error("You must supply an Id of the post to Delete");
        }

        if (!authorId) {
            throw new Error(
                "Provide the id of the user that wants to delete this post"
            );
        }

        const exist = await postsDb.findById({ id });

        if (!exist || Object.entries(exist).length === 0) {
            throw new Error("post to delete doesnt exist");
        }

        if (exist.authorId !== authorId) {
            throw new Error("You dont have the right to delete this post");
        }

        const updatedPost = makePost(exist);
        updatedPost.markDeleted();
        
        return postsDb.update({
            id: updatedPost.getId(),
            imgUrl: updatedPost.getImgUrl(),
            authorId: updatedPost.getAuthorId(),
            title: updatedPost.getTitle(),
            des: updatedPost.getDes(),
            dateAdded: updatedPost.getDateAdded(),
            location: updatedPost.getLocation(),
            approved: updatedPost.getApproved(),
            usersPended: updatedPost.getUsersPended(),
            usersApproved : updatedPost.getUsersApproved(),
            usersRejected: updatedPost.getUsersRejected(),
            deleted: updatedPost.getDeleted()
        })
    };
}
