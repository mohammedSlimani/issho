export default function makeAllPosts({postsDb}){
    return async function allPosts(){
        const posts = await postsDb.getAll();
        return posts;
    }
}