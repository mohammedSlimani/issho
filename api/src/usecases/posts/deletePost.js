export default function makeRemovePost({ postsDb }) {
    return async function removePost({ authorId, id }) {
        if (!id) {
            throw new Error("You must supply an Id of the post to Delete");
        }

        if (!authorId) {
            throw new Error(
                "Provide the id of the user that wants to delete this post"
            );
        }

        const exist = await postsDb.findById({ id });

        if (!exist) {
            throw new Error("post to delete doesnt exist");
        }

        if (exist.authorId !== authorId) {
            throw new Error("You dont have the right to delete this post");
        }

        const deleted = await postsDb.remove({ id });

        return deleted.result;
    };
}