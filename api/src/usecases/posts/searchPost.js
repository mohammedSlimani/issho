
export default function makeSearchPost ({postsDb}) {
    return async function searchPost(queries){
        return postsDb.search(queries);
    }
}