export default function makePostsOfUser({postsDb}){
    return async function postsOfUser(userId){
        const posts = await postsDb.getByUser(userId);
        return posts;
    }
}